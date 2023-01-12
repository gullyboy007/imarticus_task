import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config.js';
import Logging from './logger/logger.js';
import courseRoute from './routes/route.js';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import {fileURLToPath} from 'url';

const router = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(helmet());
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use(cors());

    
    /** Routes */
    router.use('/api', courseRoute);
    
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);
    /**Serve frontend  */
    router.use(express.static(path.join(__dirname, "./course_frontend/dist")));
    router.get("*", function (_, res) {
        res.sendFile(
        path.join(__dirname, "./course_frontend/dist/index.html"),
            function (err) {
                res.status(500).send(err);
            }
        );
    });

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'this API is working' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.9wbboja.mongodb.net/db`;


const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET
const GOOGLE_OAUTH_REDIRECT_URL = process.env.GOOGLE_OAUTH_REDIRECT_URL

const FB_APPID = FB_APPID
const FB_APPSECRET = FB_APPSECRET
export const config = {
    mongo: {
        username: MONGO_USERNAME,
        
        password: MONGO_PASSWORD,
        
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    google: {
        clientid: GOOGLE_OAUTH_CLIENT_ID,
        clientsecret: GOOGLE_OAUTH_CLIENT_SECRET,
        redirecturl: GOOGLE_OAUTH_REDIRECT_URL
    },
    fb:{
        appid:FB_APPID,
        appsecret:FB_APPSECRET

    }

};
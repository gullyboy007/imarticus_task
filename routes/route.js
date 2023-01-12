import express from 'express';
//import controller from "../controllers/course.js";
import {Course, Chapter, Lectures} from '../models/models.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post("/createcourse", (req, res) => {
    const chapters = req.body.chapters.map(chapter => {
        const lectures = chapter.lectures.map(lecture => {
            return {
                _id: new mongoose.Types.ObjectId(),
                title: lecture.title,
                videoUrl: lecture.videoUrl,
                duration: lecture.duration
            }
        });
        
        return {
            _id: new mongoose.Types.ObjectId(),
            title: chapter.title,
            lectures: lectures
        }
    });
    const newCourse = new Course({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        chapters: chapters
    });
    newCourse.save()
    .then(course => res.json(course))
    .catch(err => res.status(400).json(err))
});

router.get("/course", async (req, res) => {
    try {
        const courses = await Course.findOne()
        
        
        //const chapters = await Chapter.find().populate('lectures');
        //const lectures = await Lectures.find();
        res.json({courses});
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

export default router;
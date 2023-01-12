
import mongoose from 'mongoose';
import {course, chapter, lecture, quiz} from '../models/models.js';

const createCourse = async (req, res) =>{
    const { username,name,email,password,mobileno } = req.body;

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        title,
        lectures,
        email,
        password,
        mobileno
    });
    
    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
}

const getCourse = async (req,res) => {
  return Course.find({})
        .then((courses) => res.status(200).json({ courses }))
        .catch((error) => res.status(500).json({ error }));
};

export default { getCourse };
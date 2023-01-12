import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
});

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  lectures: [LectureSchema],
  quizzes: [{
    type: String,
  }]
});




const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  chapters: [ChapterSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', CourseSchema);
const Chapter = mongoose.model('Chapter', ChapterSchema);
const Lectures = mongoose.model('Lecture', LectureSchema);

export  {Course, Chapter, Lectures}; 



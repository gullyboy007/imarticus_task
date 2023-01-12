
import {Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import './App.css'
import VideoPage from "./components/VideoPage/VideoPage";
import CoursePage from "./components/CoursePage/CoursePage";



function App() {
  return (
      <Routes>
      <Route path="/" exact element={<CoursePage />} />
      <Route path="/chapter/:chapterId/lecture/:lectureId" element={<VideoPage />} />
    </Routes>
      
      
      
    
    
  );
}

export default App;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VideoPage.css";
import VideoSidebar from "../VideoSidebar/VideoSidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player'


const VideoPage = () => {
  const { chapterId, lectureId } = useParams();

  const [course, setCourse] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPreviousVideoPresent, SetIsPreviousVideoPresent] = useState(false);
  const [isNextVideoPresent, SetIsNextVideoPresent] = useState(false);
  const [nextChapter, setNextChapter] = useState(null);
  const [totalVideos, setTotalVideos] = useState(null);
  const [nextSection, setNextSection] = useState(null);
  const [previousChapter, setPreviousChapter] = useState(null);
  const [previousSection, setPreviousSection] = useState(null);
  const [index, setIndex] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    getCourse();
  }, [chapterId, lectureId]);

  const getCourse = async () => {
    try {
      let idx = 0;
      const response = await axios.get("/api/course");
      if (response.status === 200 ||response.status === 304) {
        setCourse(response.data.courses);
        response.data.courses?.chapters.forEach((chap) => {
          chap?.lectures.forEach((lec) => {
            ++idx;
            if (chap._id === chapterId && lec._id === lectureId) {
              setCurrentVideo(lec);
              setCurrentChapter(chap);
              setIndex(idx);
              
            }
          });
        });
        setTotalVideos(idx);
        getNextVideo(response?.data.courses.chapters);
        getPreviousVideo(response?.data.courses.chapters);
      }
    } catch (error) {
      console.log(error);
    }
  };


const getNextVideo = (data) => {

    const currentChapter = data.find((chap) => {
      return chap?._id === chapterId;
    });
    
    
    const currentLectureIndex = currentChapter.lectures.findIndex((lec) => lec._id === lectureId);
    if (currentLectureIndex !== -1 && currentLectureIndex !== currentChapter.lectures.length - 1) {
      setNextChapter(chapterId);
      setNextSection(currentChapter.lectures[currentLectureIndex + 1]._id);
      SetIsNextVideoPresent(true);
    } else {
      const nextChapterIndex = data.findIndex((chap) => chap._id === chapterId) + 1;
      if (nextChapterIndex !== -1 && nextChapterIndex !== data.length) {
        setNextChapter(data[nextChapterIndex]._id);
        setNextSection(data[nextChapterIndex].lectures[0]._id);
        SetIsNextVideoPresent(true);
      } else {
        SetIsNextVideoPresent(false);
      }
    }
    console.log(isNextVideoPresent);
  
};



  const getPreviousVideo = (data) => {
    let currentChapter = data.find((chap) => {
      return chap._id === chapterId;
    });
    
    let currentLecture = currentChapter.lectures.find((lec) => {
      return lec._id === lectureId;
    });
    let currentLectureIndex = currentChapter.lectures.indexOf(currentLecture);
    if (currentLectureIndex === 0) {
      let previousChapterIndex = data.indexOf(currentChapter) - 1;
      if (previousChapterIndex >= 0) {
        let previousChapter = data[previousChapterIndex];
        console.log(previousChapter)
        setPreviousChapter(previousChapter._id);
        setPreviousSection(previousChapter.lectures[previousChapter.lectures.length - 1]._id);
        SetIsPreviousVideoPresent(true);
      } else {
        SetIsPreviousVideoPresent(false);
      }
    } else {
      setPreviousChapter(chapterId);
      setPreviousSection(currentChapter.lectures[currentLectureIndex - 1]._id);
      SetIsPreviousVideoPresent(true);
    }
  };



  return (
    <>
      <VideoSidebar />
      <div style={{ marginLeft: "240px" }}>
        <div className="videoTitle">{currentVideo?.title}</div>
        <div className="videoInfo">
          <span>
            All Courses <span style={{ padding: "0 0.5rem" }}>&gt;</span>
          </span>
          <span>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              {course?.title}
            </Link>
          </span>
          <span style={{ padding: "0 0.5rem" }}>&gt;</span>
          <span>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              {currentChapter?.title}
            </Link>
          </span>
          <span style={{ padding: "0 0.5rem" }}>&gt;</span>
          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {currentVideo?.title}
          </span>
        </div>
        <ReactPlayer
          url={currentVideo?.url}
          controls
          width="95%"
          height="70vh"
          style={{ margin: "2rem" }}
        />
        <div className="videoControlButtons" style={{ margin: "2rem" }}>
          <button
            className="btn btn-outline-secondary"
            disabled={!isPreviousVideoPresent}
            onClick={() =>
              navigate(`/chapter/${previousChapter}/lecture/${previousSection}`)

            }
          >
            Previous
          </button>
          <div>
            {index}/{totalVideos}
          </div>
          <button
            className="btn btn-outline-secondary"
            disabled={!isNextVideoPresent}
            onClick={() => navigate(`/chapter/${nextChapter}/lecture/${nextSection}`)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
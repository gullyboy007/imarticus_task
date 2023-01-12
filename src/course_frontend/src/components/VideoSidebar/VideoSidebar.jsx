import "./VideoSidebar.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom'


 const VideoSidebar = () => {
    const { pathname } = useLocation();
    return (
        <>
            <div className="side-bar">
                <div className="content" style={{ width: "100%" }}>
                    {pathname === "/"
                        ? <>
                            <div className="shadow-sm mb-5 bg-body" style={{ padding: "9px 0", marginBottom: "40px" }}>
                                <h2 align="center">Menu</h2>
                            </div>
                            <ul className='.sidebarUl'>
                                <Link to="/">
                                    <li className='sidebarli active'>Course</li>
                                </Link>
                                <li className='sidebarli'>Discussions</li>
                            </ul>
                            <div className="stickToBottom w-100 ">
                                <hr style={{ color: "#fff", height: "3px" }} />
                                <p align="center" style={{ color: "white" }}>Facing problems!</p>
                                <button className='d-block backbutton'>Get help!</button>
                            </div>
                        </>
                        : <CustomSideBar />
                    }
                </div>
            </div>
        </>
    );
};

const CustomSideBar = () => {
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5050/api/course");
      setChapters(response.data.courses.chapters);
    };
    fetchData();
  }, []);

  return (
    <>
        <div className="custom-side-bar" style={{ background: "#055646", padding: "12px", marginBottom: "40px" }}>
            <Link to="/">
                <button className='backbutton mt-5 mx-5' align="center">&lt; Back</button>
            </Link>
        </div>
        <ul>
            {chapters.map((chapter) => (
                <div >

                
            <li key={chapter._id}>
            <button onClick={() => setSelectedChapter(chapter)}>{chapter.title}</button>
                {selectedChapter === chapter && (
            <div style={{
                fontWeight: 600,
                color: "#fefefe",
                padding: "1rem 2rem",
                borderLeft: "0.25rem solid transparent",
              }}
              className="tile">
                <ul>
                {chapter.lectures.map((lecture) => (
                    <li key={lecture._id}>
                        <Link to={`/chapter/${chapter._id}/lecture/${lecture._id}`}>
                            {lecture.title}
                        </Link>
                    </li>
                ))}
            </ul>
            </div>
        )}
    </li>
    </div>
))}
        </ul>
        <br />
        <h5 align="center">Get Certificate</h5>
        <br />
    </>
);

}

export default VideoSidebar;

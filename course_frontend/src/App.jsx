
import {Router, Route, Routes , Navigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import React from 'react';
import './App.css';
import VideoPage from "./components/VideoPage/VideoPage";
import CoursePage from "./components/CoursePage/CoursePage";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			console.log('in get user')
			const url = `https://worrisome-shift-frog.cyclic.app/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			console.log('after data fetched')
			console.log(data)
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

  return (
    <div className="container">
			<Routes>
				<Route
					exact
					path="/"
					element={user ? <CoursePage user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/signup"
					element={user ? <Navigate to="/" /> : <Signup />}
				/>
        <Route path="/chapter/:chapterId/lecture/:lectureId" element={<VideoPage />} />
			</Routes>
		</div>
      
      
      
      
    
    
  );
}

export default App;
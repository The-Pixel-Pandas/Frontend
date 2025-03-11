import React from "react";
import { Home, LeaderBoard, Login, News, SignUp, UserProfile } from "./views";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signUp" element={<SignUp />} />
					<Route path="/news" element={<News />} />
					<Route path="/leaderBoard" element={<LeaderBoard />} />
					<Route path="/userProfile" element={<UserProfile />} />
					{/* Add another routes here */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

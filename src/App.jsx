import React from "react";
import {
	Home,
	LeaderBoard,
	Login,
	News,
	SignUp,
	UserProfile,
	NotFound,
	AudioProvider,
	Game,
	Wallet,
	Dashboard,
	UserInfo,
	Preloader,
} from "./views";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";

function App() {
	return (
		<BrowserRouter>
			<Preloader />
			<AudioProvider />
			<Routes>
				{/* Home has special layout with landing page navbar */}
				<Route
					path="/"
					element={
						<Layout hasSearchBarItem={true} isQuestionSearchBar={true}>
							<Home />
						</Layout>
					}
				>
					<Route index element={<Home />} />
					<Route path=":questionId" element={<Home />} />
				</Route>

				{/* Routes with regular layout */}
				<Route
					path="/leaderBoard"
					element={
						<Layout hasSearchBarItem={false}>
							<LeaderBoard />
						</Layout>
					}
				/>

				<Route
					path="/news"
					element={
						<Layout hasSearchBarItem={true} isQuestionSearchBar={false}>
							<News />
						</Layout>
					}
				>
					<Route index element={<News />} />
					<Route path=":newsId" element={<News />} />
				</Route>

				<Route
					path="/dashboard"
					element={
						<Layout hasSearchBarItem={false}>
							<Dashboard />
						</Layout>
					}
				>
					<Route index element={<UserProfile />} />
					<Route path="userProfile" element={<UserProfile />} />
					<Route path="userInfo" element={<UserInfo />} />
					<Route path="wallet" element={<Wallet />} />
				</Route>

				<Route path="/login" element={<Login />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/game" element={<Game />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

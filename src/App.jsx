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
	DashboardBase,
	UserInfo,
	Tasks,
	Preloader,
	SubmitQuestion,
	ForecastResults,
	AdminProfile,
	AdminSubmitQuestion,
	AdminManageQuestion,
	AdminSubmitNews,
	AdminManageTasks,
	AdminCloseQuestion,
	AdminForecastResult,
	Notification,
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
						<Layout>
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
						<Layout>
							<LeaderBoard />
						</Layout>
					}
				/>

				<Route
					path="/news"
					element={
						<Layout>
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
						<Layout>
							<DashboardBase />
						</Layout>
					}
				>
					<Route path="userProfile" element={<UserProfile />} />
					<Route path="profile" element={<UserProfile />} />
					<Route path="userInfo" element={<UserInfo />} />
					<Route path="tasks" element={<Tasks />} />
					<Route path="wallet" element={<Wallet />} />
					<Route path="notification" element={<Notification />} />
					<Route path="submitQuestion" element={<SubmitQuestion />} />
					<Route path="forecastResults" element={<ForecastResults />} />
					<Route path="adminProfile" element={<AdminProfile />} />
					<Route path="adminSubmitQuestion" element={<AdminSubmitQuestion />} />
					<Route path="adminManageQuestion" element={<AdminManageQuestion />} />
					<Route path="adminSubmitNews" element={<AdminSubmitNews />} />
					<Route path="adminManageTasks" element={<AdminManageTasks />} />
					<Route path="adminCloseQuestion" element={<AdminCloseQuestion />} />
					<Route path="adminForecastResult" element={<AdminForecastResult />} />
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

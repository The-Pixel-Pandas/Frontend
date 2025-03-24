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
} from "./views";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <AudioProvider />
      <Routes>
        {/* Home has special layout with landing page navbar */}
        <Route path="/" element={
          <Layout isLandingPage={true}>
            <Home />
          </Layout>
        } />

        {/* LeaderBoard has regular layout */}
        <Route path="/leaderBoard" element={
          <Layout isLandingPage={false}>
            <LeaderBoard />
          </Layout>
        } />

        {/* Other routes without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/news" element={<News />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
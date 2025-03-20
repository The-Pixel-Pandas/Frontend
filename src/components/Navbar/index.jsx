import React from "react";
import PropTypes from "prop-types";
import userProfile from "../../assets/images/userProfile.png";
import news from "../../assets/images/news.png";
import leaderboard from "../../assets/images/leaderboard.png";
import logo from "../../assets/images/logo.png";
import SearchBar from "../SearchBar";
import NavbarAuthBtn from "../NavbarAuthBtn";
import { useNavigate } from "react-router-dom";
import { eventHandler } from "../../services";

const Navbar = ({ isLandingPage = true, isAuthenticated = false }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="mt-3">
				{/* Logo */}
				<div className="flex flex-row items-center">
					<div className="flex flex-row items-center">
						<img src={logo} alt="Logo" style={{ width: 155, height: 122 }} />
						<div className="text-white font-Lalezar text-3xl">
							پانداهای پیکسلی
						</div>
					</div>
					<div className="flex flex-1 ml-10">
						<div className={isLandingPage ? "" : "hidden"}>
							<SearchBar width="535px" />
						</div>
					</div>
					{/* User Buttons */}
					<div className="flex flex-row mr-10">
						<button
							style={{ width: "28.5px", height: "33.25px" }}
							className="mr-10 transition-transform hover:scale-105"
							onClick={() => {
								eventHandler.dispatchEvent("ClickSound");
								navigate("/userProfile");
							}}
						>
							<img src={userProfile} alt="userProfile" />
						</button>
						<button
							style={{ width: "31.67px", height: "31.67px" }}
							className="mr-10 transition-transform hover:scale-105"
							onClick={() => {
								eventHandler.dispatchEvent("ClickSound");
								navigate("/news");
							}}
						>
							<img src={news} alt="news" />
						</button>
						<button
							style={{ width: "28.5px", height: "31.67px" }}
							className="mr-10 transition-transform hover:scale-105"
							onClick={() => {
								eventHandler.dispatchEvent("ClickSound");
								navigate("/leaderboard");
							}}
						>
							<img src={leaderboard} alt="leaderboard" />
						</button>
						{/* Auth Buttons */}
						<div className="flex flex-row ">
							<div className={isAuthenticated ? "hidden" : ""}>
								<NavbarAuthBtn authType="ورود" />
							</div>
							<div className="flex flex-row ml-10">
								<div className={isAuthenticated ? "hidden" : ""}>
									<NavbarAuthBtn authType="ثبت نام" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

Navbar.propTypes = {
	isLandingPage: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
};

export default Navbar;

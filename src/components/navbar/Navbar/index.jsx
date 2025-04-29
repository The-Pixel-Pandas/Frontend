import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NavbarAuthBtn from "../NavbarAuthBtn";
import { useNavigate } from "react-router-dom";
import { useCoinStore, eventHandler, cacheService } from "../../../services";
import UserAvatar from "../../chore/UserAvatar";
import game from "../../../assets/images/game.png";
import userProfile from "../../../assets/images/userProfile.png";
import news from "../../../assets/images/news.png";
import leaderboard from "../../../assets/images/leaderBoard.png";
import logo from "../../../assets/images/logo.png";

const Navbar = ({ isAuthenticated = false }) => {
	const navigate = useNavigate();
	const { getCoin } = useCoinStore();
	const { resetAll } = cacheService;
	const [isAuth, setAuth] = useState(isAuthenticated);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleSignOut = () => {
		eventHandler.dispatchEvent("ClickSound");
		resetAll();
	};

	useEffect(() => {
		setAuth(isAuthenticated);
	}, [isAuthenticated]);

	return (
		<>
			{/* Logo */}
			<div className="flex flex-row items-center bg-secondary">
				<div className="flex flex-row items-center mt-3 mb-1">
					<button
						className="outline-none"
						onClick={() => {
							eventHandler.dispatchEvent("ClickSound");
							navigate("/");
						}}
					>
						<img src={logo} alt="Logo" style={{ width: 105, height: 80 }} />
					</button>
					<div className="text-white font-Lalezar text-3xl">
						پانداهای پیکسلی
					</div>
				</div>
				<div className="flex flex-1 ml-10"></div>
				{/* User Buttons */}
				<div className="flex flex-row mr-10">
					<button
						style={{ width: "46px", height: "46px" }}
						className="mr-10 transition-transform hover:scale-105 outline-none mt-1.5"
						onClick={() => {
							eventHandler.dispatchEvent("ClickSound");
							navigate("/game");
						}}
					>
						<img
							src={game}
							alt="game"
							style={{ width: "38px", height: "25.13px" }}
						/>
					</button>
					<div className="flex flex-row mr-10 mt-3">
						<button
							style={{ width: "26.5px", height: "30.67px" }}
							className="mr-10 transition-transform hover:scale-105 outline-none"
							onClick={() => {
								eventHandler.dispatchEvent("ClickSound");
								if (isAuthenticated) navigate("/dashboard");
								else navigate("/login");
							}}
						>
							<img src={userProfile} alt="userProfile" />
						</button>
						<button
							style={{ width: "28.67px", height: "28.67px" }}
							className="mr-10 transition-transform hover:scale-105 outline-none"
							onClick={() => {
								eventHandler.dispatchEvent("ClickSound");
								navigate("/news");
							}}
						>
							<img src={news} alt="news" />
						</button>
						<button
							style={{ width: "25.5px", height: "28.67px" }}
							className=" transition-transform hover:scale-105 outline-none"
							onClick={() => {
								eventHandler.dispatchEvent("ClickSound");
								navigate("/leaderboard");
							}}
						>
							<img src={leaderboard} alt="leaderboard" />
						</button>
						{/* Auth Buttons */}
						<div className={isAuth ? "hidden" : ""}>
							<div className="flex flex-row ml-10">
								<NavbarAuthBtn authType="ورود" />
								<div className="flex flex-row ml-10">
									<NavbarAuthBtn authType="ثبت نام" />
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Avatar */}
				<div className={isAuth ? "" : "hidden"}>
					<div className="flex flex-col items-center mr-10 relative">
						{/* Coin */}
						<div className="text-white font-Lalezar text-lg absolute mt-12">
							{getCoin().toLocaleString("fa")}
						</div>
						{/* Icon */}
						<button
							className="focus:outline-none -mr-2"
							onClick={() => {
								setIsDropdownOpen(!isDropdownOpen);
							}}
						>
							<UserAvatar width={52} height={50} />
						</button>
						{/* Dropdown */}
						<div
							className={`${
								isDropdownOpen ? "" : "hidden"
							} absolute top-0 right-0 -mr-5 mt-[70px] bg-purple-950 rounded-xl p-2 hover:bg-purple-800 w-20`}
						>
							{/* Exit Button */}
							<button
								className="focus:outline-none w-full"
								onClick={() => {
									handleSignOut();
									setIsDropdownOpen(false);
								}}
							>
								<div className="text-white font-MorabbaMedium  text-lg whitespace-nowrap text-center">
									خروج
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

Navbar.propTypes = {
	hasSearchBarItem: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
	isQuestionSearchBar: PropTypes.bool,
};

export default Navbar;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar";
import NavbarAuthBtn from "../NavbarAuthBtn";
import { useNavigate } from "react-router-dom";
import { useCoinStore, eventHandler } from "../../../services";
import UserAvatar from "../../chore/UserAvatar";
import game from "../../../assets/images/game.png";
import userProfile from "../../../assets/images/userProfile.png";
import news from "../../../assets/images/news.png";
import leaderboard from "../../../assets/images/leaderboard.png";
import logo from "../../../assets/images/logo.png";

const Navbar = ({
	hasSearchBarItem = true,
	isAuthenticated = false,
	isQuestionSearchBar = true,
}) => {
	const navigate = useNavigate();
	const { getCoin } = useCoinStore();
	const [isAuth, setAuth] = useState(isAuthenticated);

	useEffect(() => {
		setAuth(isAuthenticated);
	}, [isAuthenticated]);

	const shouldShowSearchBar = () => {
		return (
			(hasSearchBarItem &&
				window.location.pathname === "/" &&
				!window.location.pathname.includes("/[0-9]+")) ||
			(hasSearchBarItem &&
				window.location.pathname === "/news" &&
				!window.location.pathname.includes("/news/[0-9]+"))
		);
	};

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
				<div className="flex flex-1 ml-10">
					<div className={shouldShowSearchBar() ? "" : "hidden"}>
						<SearchBar
							width="535px"
							isQuestionSearchBar={isQuestionSearchBar}
						/>
					</div>
				</div>
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
								navigate("/dashboard");
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
						<div className="text-white font-Lalezar text-lg absolute mt-12">
							{getCoin().toLocaleString("fa")}
						</div>
						<UserAvatar width={52} height={50} />
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

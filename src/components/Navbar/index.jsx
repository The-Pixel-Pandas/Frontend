import React from "react";
import logo from "../../assets/images/logo.png";
import leaderBoard from "../../assets/images/leaderBoard.png";
import news from "../../assets/images/news.png";
import profile from "../../assets/images/profile.png";

const Navbar = () => {
	return (
		<nav className="#0c0724 text-white p-4 flex justify-between items-center">
			{/* Logo */}
			<div className="flex items-center space-x-2">
				<img src={logo} alt="Logo" className="w-20 h-15 flex" />
				<h1 className="flex text-white font-Lalezar text-4xl">پاندا های پیکسلی</h1>
			</div>

			{/* Search Bar */}
			<div className="relative w-1/3">
				<input
					type="text"
					placeholder="جستجو..."
					className="w-full p-2 pl-10 pr-4 rounded-2xl bg-white text-black focus:outline-none"
				/>
			</div>

			{/* Icons */}
			<div className="flex space-x-5">
				<img src={profile} alt="profile" />
				<img src={news} alt="news" />
				<img src={leaderBoard} alt="leaderBoard" />
			</div>

			<div className="flex items-center space-x-3">
				<button className="bg-white text-black px-4 py-2 rounded-full">
					ورود
				</button>
				<button className="bg-white text-black px-4 py-2 rounded-full">
					ثبت نام
				</button>
			</div>
		</nav>
	);
};

export default Navbar;

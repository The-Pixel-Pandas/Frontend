import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import homeAuthBtn from "../../assets/images/homeAuthBtn.png";
import { eventHandler } from "../../services";

const NavbarAuthBtn = ({ authType }) => {
	const navigate = useNavigate();

	const handleAuth = () => {
		if (authType === "ورود") {
			navigate("/login");
		} else {
			navigate("/signup");
		}
		eventHandler.dispatchEvent("OpenPopupSound");
	};

	return (
		<button
			className="relative hover:scale-105 transition-transform"
			onClick={handleAuth}
		>
			<div
				className="absolute z-10 text-white font-Lalezar"
				style={{
					top: "50%",
					left: "40%",
					transform: "translate(-50%, -50%)",
				}}
			>
				{authType}
			</div>
			<img src={homeAuthBtn} alt="LoginBtn" />
		</button>
	);
};

NavbarAuthBtn.propTypes = {
	authType: PropTypes.string.isRequired,
};

export default NavbarAuthBtn;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import adminButton from "../../../assets/images/adminButton.png";
import dashboardButton from "../../../assets/images/dashboardButton.png";
import dashboardButtonBorder from "../../../assets/images/dashboardButtonBorder.png";

const NavLinkButton = ({ text, path, number, isAdminButton = false }) => {
	const [selectedButton, setSelectedButton] = useState(0);
	const [isAdmin, setAdmin] = useState(isAdminButton);
	const location = useLocation();

	const handleClick = (index) => {
		setSelectedButton(index);
	};

	useEffect(() => {
		switch (location.pathname) {
			// User Dashboard
			case "/dashboard/userProfile":
				setSelectedButton(0);
				break;
			case "/dashboard/userInfo":
				setSelectedButton(1);
				break;
			case "/dashboard/submitQuestion":
				setSelectedButton(2);
				break;
			case "/dashboard/wallet":
				setSelectedButton(3);
				break;
			case "/dashboard/forecastResults":
				setSelectedButton(4);
				break;
			// Admin Dashboard
			case "/dashboard/adminProfile":
				setSelectedButton(0);
				setAdmin(true);
				break;
			case "/dashboard/adminSubmitQuestion":
				setSelectedButton(1);
				setAdmin(true);
				break;
			case "/dashboard/adminManageQuestion":
				setSelectedButton(2);
				setAdmin(true);
				break;
			case "/dashboard/adminSubmitNews":
				setSelectedButton(3);
				setAdmin(true);
				break;
			case "/dashboard/adminManageNews":
				setSelectedButton(4);
				setAdmin(true);
				break;
			default:
				break;
		}
	}, [location.pathname]);

	return (
		<>
			<NavLink to={path}>
				<button onClick={() => handleClick(number)} className="outline-none">
					<div className="relative">
						<div
							className="absolute z-10 text-white font-Lalezar text-lg whitespace-nowrap"
							style={{
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
							}}
						>
							{text}
						</div>
						{selectedButton === number && (
							<div className="absolute z-10">
								<img
									src={dashboardButtonBorder}
									alt="dashboardButtonBorder"
									style={{ width: 266 }}
								/>
							</div>
						)}
						<img
							src={isAdmin ? adminButton : dashboardButton}
							alt="dashboardButton"
							className="outline-none"
							style={{ width: 266 }}
						/>
					</div>
				</button>
			</NavLink>
		</>
	);
};

NavLinkButton.propTypes = {
	text: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	isAdminButton: PropTypes.bool,
};

export default NavLinkButton;

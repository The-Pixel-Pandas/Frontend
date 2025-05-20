import React from "react";
import PropTypes from "prop-types";
import bilbilak from "../../../assets/images/bilbilak.png";

const NotificationBox = ({ title, description, background }) => {
	return (
		<div>
			<div className=" relative">
				<img
					src={background}
					alt="blueBox"
					style={{ width: 950, height: 100 }}
				/>
				<div className="absolute inset-0 left-0 top-0 ">
					<div className="flex flex-col gap-2 mt-5 mr-5 " dir="rtl">
						<div className=" font-MorabbaBold whitespace-nowrap text-xl text-white">
							{title}
						</div>
						<div className="flex flex-row items-center gap-2">
							<img src={bilbilak} alt="bilbilak" />
							<div className=" font-MorabbaMedium whitespace-nowrap text-lg text-white">
								{description}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

NotificationBox.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	background: PropTypes.string.isRequired,
};

export default NotificationBox;

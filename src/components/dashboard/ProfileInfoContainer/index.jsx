import React from "react";
import infoContainer from "../../../assets/images/infoContainer.png";

const ProfileInfoContainer = () => {
	return (
		<>
			<div className="relative">
				<img src={infoContainer} alt="infoContainer" />
				<div className=" absolute inset-0 top-0 left-28">
					<div className=" flex flex-col gap-5">
						<div className=" font-MorabbaMedium  text-white text-lg  mt-5">
							رتبه
						</div>
						<div className=" font-MorabbaMedium text-white text-lg "> 145 </div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileInfoContainer;

import { useState } from "react";
import { eventHandler } from "../../services";

const useProfilePopup = () => {
	const [showProfile, setShowProfile] = useState(false);

	const openPopUp = () => {
		setShowProfile(true);
		eventHandler.dispatchEvent("OpenPopupSound");
	};

	const closePopUp = () => {
		setShowProfile(false);
		eventHandler.dispatchEvent("ClosePopupSound");
	};

	return {
		showProfile,
		openPopUp,
		closePopUp,
	};
};

export default useProfilePopup;

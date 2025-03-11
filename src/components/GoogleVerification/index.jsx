import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import googleButton from "../../assets/images/googleButton.png";
import Toast from "../Toast";

const GoogleVerification = ({ width, height, verificationType }) => {
	const navigate = useNavigate();
	const [showSuccessToast, setShowSuccessToast] = useState(false);
	const [showErrorToast, setShowErrorToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const handleLoginSuccess = (credentialResponse) => {
		setToastMessage(`Successfully ${verificationType}ed!`);
		console.log(toastMessage, credentialResponse);
		setShowSuccessToast(true);
	};

	const handleLoginError = () => {
		setToastMessage(`Failed to ${verificationType.toLowerCase()}!`);
		setShowErrorToast(true);
	};

	const login = useGoogleLogin({
		onSuccess: handleLoginSuccess,
		onError: handleLoginError,
		flow: "auth-code",
	});

	return (
		<>
			<button
				onClick={login}
				className="transition-transform hover:scale-105"
				aria-label="Continue with Google"
			>
				<img
					src={googleButton}
					alt="Continue with Google"
					className={`w-[${width}px] h-[${height}px]`}
					loading="lazy"
				/>
			</button>
			{showErrorToast && <Toast type="error" message={toastMessage} />}
			{showSuccessToast && (
				<>
					<Toast type="success" message={toastMessage} />
					{setTimeout(() => {
						navigate("/home");
					}, 2000)}
				</>
			)}
		</>
	);
};

GoogleVerification.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	verificationType: PropTypes.oneOf("Login", "SignUp"),
};

export default GoogleVerification;

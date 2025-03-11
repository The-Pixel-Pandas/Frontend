import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import googleButton from "../../assets/images/googleButton.png";

const GoogleVerification = ({ width = 200, height = 50 }) => {
	const navigate = useNavigate();

	const handleLoginSuccess = (credentialResponse) => {
		console.log("Login Success:", credentialResponse);
		navigate("/home");
	};

	const handleLoginError = () => {
		console.log("Login Failed");
		alert("ERROR Cant Continue With Google");

	};

	const login = useGoogleLogin({
		onSuccess: handleLoginSuccess,
		onError: handleLoginError,
		flow: "auth-code",
	});

	return (
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
	);
};

export default GoogleVerification;

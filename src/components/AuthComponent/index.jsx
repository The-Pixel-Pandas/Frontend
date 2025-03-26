import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuthStore, eventHandler } from "../../services";
import GoogleVerification from "../GoogleVerification";
import AuthForm from "../AuthForm";
import Toast from "../Toast";
import authButton from "../../assets/images/authButton.png";
import logo from "../../assets/images/logo.png";
import { httpService, useCoinStore, useAvatarStore } from "../../services";

const AuthComponent = ({ authType }) => {
	const { isAuthenticated, isError, loginMessage, email, password, setUser } =
		useAuthStore();
	const { setAvatarNumber } = useAvatarStore();
	const { setCoin } = useCoinStore();
	const navigate = useNavigate();

	const handleLoginSignInAPI = (URL, data) => {
		httpService
			.post(URL, data)
			.then((res) => {
				console.log("Login/Signin API response:", res);
				if (res.status == "success") {
					setUser(email, password, true);
					setAvatarNumber(res.data.user.avatar);
					setCoin(res.data.user.coinAmount);
					navigate("/");
				}
			})
			.catch((err) => {
				console.log("Login/Signin API error:", err);
				setUser(email, password, true, false);
			});
	};

	const submitButton = () => {
		eventHandler.dispatchEvent("ClickSound");
		if (authType === "ورود") {
			handleLoginSignInAPI("https://dummyjson.com/c/7539-63f8-4f6a-82a6", {
				email,
				password,
			});
		} else if (authType === "ثبت نام") {
			handleLoginSignInAPI("https://dummyjson.com/c/7386-d8b3-4242-9903", {
				email,
				password,
			});
		}
	};

	return (
		<>
			{/* Blurs */}
			<div className="relative w-full h-full z-0">
				<div className="fixed bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 -translate-x-1/2 rounded-full bg-blurs-100 blur-3xl opacity-20"></div>
				<div className="fixed top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 -translate-y-1/2 rounded-full bg-blurs-200 blur-3xl opacity-20"></div>
				<div className="fixed top-1/8 right-0 w-48 h-48 md:w-96 md:h-96 translate-x-1/4 translate-y-1/4 rounded-full bg-blurs-300 blur-3xl opacity-20"></div>
			</div>
			{/* Header */}
			<div className="flex flex-row justify-center items-center">
				<div className="fixed mt-50 mr-28">
					<div className="flex flex-row items-center">
						<img src={logo} alt="Logo" style={{ width: 155, height: 122 }} />
						<div className="text-white font-Lalezar text-6xl ml-4">
							{authType}
						</div>
					</div>
				</div>
			</div>
			{/* Body */}
			<div className="flex flex-col justify-center items-center">
				<GoogleVerification
					width={481}
					height={61}
					verificationType={authType}
				/>
				<div className="text-white font-MorabbaMedium text-xl mt-6">یا</div>
				<AuthForm />
				<button
					className="relative mt-12 transition-transform hover:scale-105"
					style={{ width: 481, height: 63 }}
					onClick={submitButton}
				>
					<div
						className="absolute z-10 text-white font-Lalezar text-3xl"
						style={{
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						{authType}
					</div>
					<img src={authButton} alt="Authentication Button" />
				</button>
			</div>
			{/* Toasts */}
			{isError && (
				<Toast type="error" message={loginMessage} position="bottom-left" />
			)}
			{isAuthenticated && (
				<Toast type="success" message={loginMessage} position="bottom-left" />
			)}
		</>
	);
};

AuthComponent.propTypes = {
	authType: PropTypes.string,
};

export default AuthComponent;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuthStore, eventHandler } from "../../../services";
import GoogleVerification from "../GoogleVerification";
import AuthForm from "../AuthForm";
import Toast from "../../chore/Toast";
import {
	httpService,
	useCoinStore,
	useAvatarStore,
	useTokenStore,
} from "../../../services";
import authButton from "../../../assets/images/authButton.png";
import logo from "../../../assets/images/logo.png";

const AuthComponent = ({ authType }) => {
	const {
		isAuthenticated,
		isError,
		loginMessage,
		email,
		password,
		setUser,
		setLoginMessage,
	} = useAuthStore();
	const { setAvatarNumber } = useAvatarStore();
	const { setCoin } = useCoinStore();
	const { setToken } = useTokenStore();
	const navigate = useNavigate();

	const handleAuthAPI = (URL, data) => {
		httpService
			.post(URL, data)
			.then((res) => {
				console.log("Login/Signin API response:", res);
				if (res.status == "success") {
					// Store User Info
					setUser(email, password);
					setAvatarNumber(res.data.user.avatar);
					setCoin(res.data.user.coinAmount);
					setToken(res.data.token);
					// Set Login Message
					setLoginMessage(`${authType} با موفقیت انجام شد`);
				} else {
					// Store User Info
					setUser(email, password, false, false);
					// Set Login Message
					setLoginMessage(res.message);
					console.log(res.message);
				}
			})
			.catch((err) => {
				console.log("Login/Signin API error:", err);
				setUser(email, password, false, false);
				setLoginMessage(err.message);
			});
	};

	const submitButton = () => {
		eventHandler.dispatchEvent("ClickSound");
		const form = document.getElementById("authForm");
		if (form) {
			const submitEvent = new Event("submit", { cancelable: true });
			form.dispatchEvent(submitEvent);

			const formState = window.authFormState || {};
			if (!form.checkValidity() || !formState.isValid || !formState.dirty) {
				setLoginMessage("لطفا فرم را به درستی پر کنید");
				setUser(email, password, false, false);
				return;
			}

			const data = {
				email: email,
				password: password,
			};

			if (authType === "ورود") {
				handleAuthAPI("https://dummyjson.com/c/2a61-718b-4cd4-aeb2", data);
			} else if (authType === "ثبت نام") {
				handleAuthAPI("https://dummyjson.com/c/2083-02bd-418a-a281", data);
			}
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			const timer = setTimeout(() => {
				navigate("/");
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		if (isError) {
			setLoginMessage("");
		}
	}, [isError, loginMessage, authType]);

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
			{isAuthenticated && !isError && (
				<Toast type="success" message={loginMessage} position="bottom-left" />
			)}
		</>
	);
};

AuthComponent.propTypes = {
	authType: PropTypes.string,
};

export default AuthComponent;

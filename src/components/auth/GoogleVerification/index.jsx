import React from "react";
import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore, eventHandler } from "../../../services";
import axios from "axios";
import googleButton from "../../../assets/images/googleButton.png";

const GoogleVerification = ({ width, height, verificationType }) => {
	const { setUser, setLoading, setError, setLoginMessage } = useAuthStore();

	const handleLoginSuccess = async (credentialResponse) => {
		try {
			setLoading();

			const response = await axios.get(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					headers: {
						Authorization: `Bearer ${credentialResponse.access_token}`,
					},
				}
			);
			const { email } = response.data;

			setUser(email);
			localStorage.setItem("userEmail", email);
			setLoginMessage(`${verificationType} با موفقیت انجام شد`);
		} catch (error) {
			setError("خطا در دریافت اطلاعات کاربر");
			console.error("Error fetching user data:", error);
		}
	};

	const handleLoginError = () => {
		setError(`در هنگام ${verificationType} خطایی رخ داد`);
		console.error("Google Login Failed!");
	};

	const login = useGoogleLogin({
		onSuccess: handleLoginSuccess,
		onError: handleLoginError,
		flow: "implicit",
		scope: "email profile",
	});

	return (
		<>
			<div
				className="flex flex-col items-center relative transition-transform hover:scale-105 mt-64 outline-none"
				onClick={() => eventHandler.dispatchEvent("ClickSound")}
			>
				<button onClick={login} className="outline-none">
					<div
						className="absolute z-10 text-white font-MorabbaMedium text-xl"
						style={{
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						ادامه دادن با گوگل
					</div>

					<div
						aria-label="Continue with Google"
						className={`w-[${width}px] h-[${height}px] outline-none`}
					>
						<img src={googleButton} alt="Continue with Google" loading="lazy" />
					</div>
				</button>
			</div>
		</>
	);
};

GoogleVerification.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	verificationType: PropTypes.oneOf(["ورود", "ثبت نام"]),
};

export default GoogleVerification;

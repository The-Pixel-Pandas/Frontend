import React from "react";
import { AuthComponent } from "../../components";
import { useNavigate } from "react-router-dom";
import { eventHandler } from "../../services";

const SignUp = () => {
	const navigate = useNavigate();
	const handleCreateAccount = () => {
		eventHandler.dispatchEvent("ClickSound");
		navigate("/login");
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center">
				<AuthComponent authType="ثبت نام" />
				<div className="mt-10">
					<div className="flex flex-row justify-center items-center">
						<button
							className="mr-10 text-white font-MorabbaMedium text-2xl font-bold outline-none"
							onClick={handleCreateAccount}
						>
							ورود به حساب کاربری
						</button>
						<div className="text-white font-MorabbaMedium text-xl">
							حساب کاربری دارید؟
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;

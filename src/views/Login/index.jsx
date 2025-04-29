import React from "react";
import { AuthComponent } from "../../components";
import { useNavigate } from "react-router-dom";
import { eventHandler } from "../../services";

const Login = () => {
	const navigate = useNavigate();
	const handleCreateAccount = () => {
		eventHandler.dispatchEvent("ClickSound");
		navigate("/signup");
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center">
				<AuthComponent authType="ورود" />
				<div className="mt-10">
					<div className="flex flex-row justify-center items-center">
						<button
							className="mr-10 text-white font-MorabbaMedium text-2xl font-bold outline-none"
							onClick={handleCreateAccount}
						>
							ایجاد حساب کاربری
						</button>
						<div className="text-white font-MorabbaMedium text-xl">
							آیا حساب کاربری ندارید؟
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;

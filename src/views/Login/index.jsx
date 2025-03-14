import React from "react";
import { GoogleVerification } from "../../components";

const Login = () => {
	return (
		<>
			{/* sample usage of component */}
			<div className="relative w-full h-full z-0">
				<div className="fixed bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 -translate-x-1/2 rounded-full bg-blurs-100 blur-3xl opacity-20"></div>
				<div className="fixed top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 -translate-y-1/2 rounded-full bg-blurs-200 blur-3xl opacity-20"></div>
				<div className="fixed top-1/8 right-0 w-48 h-48 md:w-96 md:h-96 translate-x-1/4 translate-y-1/4 rounded-full bg-blurs-300 blur-3xl opacity-20"></div>
			</div>
			<GoogleVerification width={800} height={1000} verificationType="ورود" />
		</>
	);
};

export default Login;

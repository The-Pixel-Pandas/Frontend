import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

/*  it work correctly in firefox browser without error
    but in other browser get error (Cross-Origin-Opener-Policy policy would block the window.postMessage call.)
*/
const LoginForm = () => {
	const login = useGoogleLogin({
		onSuccess: (credentialResponse) => {
			console.log("Login Success:", credentialResponse);
		},
		onError: () => {
			console.log("Login Failed");
		},
		flow: "auth-code",
	});

	return <button onClick={login}>Sign in with Google</button>;
};

export default LoginForm;

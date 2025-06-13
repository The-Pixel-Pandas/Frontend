import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({
	position = "top-center",
	type = "default",
	theme = "dark",
	closeTime = 2000,
	message,
}) => {
	useEffect(() => {
		if (message) {
			showToast(message);
		}
	}, [message, type]);

	const showToast = (message) => {
		const toastTypes = {
			success: toast.success,
			error: toast.error,
			warning: toast.warning,
			info: toast.info,
			default: toast,
		};

		const toastFunction = toastTypes[type] || toastTypes.default;
		toastFunction(message);
	};

	return (
		<ToastContainer
			position={position}
			autoClose={closeTime}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme={theme}
			transition:Bounce
		/>
	);
};

Toast.propTypes = {
	position: PropTypes.oneOf([
		"top-right",
		"top-left",
		"top-center",
		"bottom-right",
		"bottom-left",
		"bottom-center",
	]),
	type: PropTypes.oneOf(["success", "error", "warning", "info", "default"]),
	theme: PropTypes.oneOf(["light", "dark", "colored"]),
	closeTime: PropTypes.number,
	message: PropTypes.string,
};

export default Toast;

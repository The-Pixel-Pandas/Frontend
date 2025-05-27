import { useState } from "react";

const useToast = ({ time = 3000 }) => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isError, setIsError] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const showToast = (message, isError) => {
		setIsSubmitted(true);
		setIsError(isError);
		setToastMessage(message);
		setTimeout(() => {
			setIsSubmitted(false);
			setIsError(false);
			setToastMessage("");
		}, time);
	};

	return {
		toastMessage,
		isSubmitted,
		isError,
		showToast,
	};
};

export default useToast;

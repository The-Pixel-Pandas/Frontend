import { useState } from "react";

const useToast = () => {
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
		}, 3000);
	};

	return {
		toastMessage,
		isSubmitted,
		isError,
		showToast,
	};
};

export default useToast;

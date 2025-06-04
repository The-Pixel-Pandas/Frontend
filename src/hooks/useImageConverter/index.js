import { useState } from "react";

export const useImageConverter = () => {
	const [base64Image, setBase64Image] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const convertToBase64 = async (image) => {
		if (!image) return;

		setIsLoading(true);
		setError(null);

		try {
			// If image is already a base64 string, return it
			if (typeof image === "string" && image.startsWith("data:")) {
				setBase64Image(image);
				return image;
			}

			// If image is a File object, use FileReader
			if (image instanceof File) {
				const reader = new FileReader();
				const base64String = await new Promise((resolve, reject) => {
					reader.onload = () => resolve(reader.result);
					reader.onerror = reject;
					reader.readAsDataURL(image);
				});
				setBase64Image(base64String);
				return base64String;
			}

			// If image is a URL, fetch and convert to blob first
			if (typeof image === "string") {
				const response = await fetch(image);
				const blob = await response.blob();
				const reader = new FileReader();
				const base64String = await new Promise((resolve, reject) => {
					reader.onload = () => resolve(reader.result);
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				});
				setBase64Image(base64String);
				return base64String;
			}

			throw new Error("Invalid image type");
		} catch (err) {
			setError("خطا در تبدیل تصویر");
			console.error("Error converting image:", err);
			return null;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		base64Image,
		isLoading,
		error,
		convertToBase64,
	};
};

export default useImageConverter;

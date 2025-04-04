import { useState } from "react";
import { httpService } from "../../services";

const useFetchData = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const fetchData = async (url) => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await httpService.get(url);

			if (!response) {
				throw new Error("No data received from server");
			}
			setData(response);
			return response;
		} catch (err) {
			console.error("Failed to fetch data:", err);
			setError("خطا در ارتباط با سرور لطفا مجددا تلاش کنید");
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		fetchData,
		data,
		isLoading,
		error,
	};
};

export default useFetchData;

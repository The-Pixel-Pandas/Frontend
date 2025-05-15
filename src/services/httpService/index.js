import axios from "axios";
import cacheService from "../cacheService";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
	baseURL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const { response } = error;

		if (response) {
			if (response.status === 401) {
				cacheService.resetAll();
				window.location = "/login";
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.request.use(
	(config) => {
		const token = JSON.parse(localStorage.getItem("token-storage"));
		if (token) {
			config.headers.Authorization = `Bearer ${token.state.access}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		const { response } = error;

		if (response) {
			switch (response.status) {
				case 401:
					console.error("Unauthorized access");
					break;
				case 404:
					console.error("Resource not found");
					break;
				case 500:
					console.error("Server error");
					break;
				default:
					console.error("An error occurred");
			}
			return Promise.reject(response.data);
		}

		return Promise.reject(error);
	}
);

export const httpService = {
	get: (url, params) => axiosInstance.get(url, { params }),
	post: (url, data) => axiosInstance.post(url, data),
	put: (url, data) => axiosInstance.put(url, data),
	patch: (url, data) => axiosInstance.patch(url, data),
	delete: (url) => axiosInstance.delete(url),
};

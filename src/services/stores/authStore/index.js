import { create } from "zustand";

const useAuthStore = create((set) => ({
	email: null,
	password: null,
	isAuthenticated: false,
	isLoading: false,
	isSuccess: false,
	isError: false,
	loginMessage: "",

	setUser: (email, password = null) =>
		set({
			email,
			...(password && { password }),
			isAuthenticated: true,
			isSuccess: true,
			isError: false,
			isLoading: false,
		}),

	setLoading: () =>
		set({
			isLoading: true,
			isSuccess: false,
			isError: false,
		}),

	setError: (errorMessage) =>
		set({
			isError: true,
			isSuccess: false,
			isLoading: false,
			loginMessage: errorMessage,
		}),

	setLoginMessage: (loginMessage) =>
		set({
			loginMessage: loginMessage,
		}),

	reset: () =>
		set({
			email: null,
			isAuthenticated: false,
			isLoading: false,
			isSuccess: false,
			isError: false,
			loginMessage: "",
		}),
}));

export default useAuthStore;

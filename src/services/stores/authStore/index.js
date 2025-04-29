import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
	persist(
		(set) => ({
			email: null,
			password: null,
			isAuthenticated: false,
			isLoading: false,
			isSuccess: false,
			isError: false,
			loginMessage: "",

			setUser: (
				email,
				password = null,
				isAuthenticated = true,
				isSuccess = true
			) =>
				set({
					email,
					...(password ? { password: "" } : {}),
					isAuthenticated: isAuthenticated,
					isSuccess: isSuccess,
					isError: !isSuccess,
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
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				email: state.email,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);

export default useAuthStore;

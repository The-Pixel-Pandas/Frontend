import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTokenStore = create(
	persist(
		(set) => ({
			token: null,
			setToken: (token) => set({ token }),
			reset: () => set({ token: null }),
		}),
		{
			name: "token-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useTokenStore;

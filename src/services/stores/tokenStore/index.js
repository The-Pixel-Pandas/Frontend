import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTokenStore = create(
	persist(
		(set) => ({
			access: null,
			refresh: null,
			setAccessToken: (token) => set({ access: token }),
			setRefreshToken: (token) => set({ refresh: token }),
			reset: () => set({ access: null, refresh: null }),
		}),
		{
			name: "token-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useTokenStore;

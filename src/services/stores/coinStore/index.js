import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCoinStore = create(
	persist(
		(set, get) => ({
			coin: 0,
			setCoin: (coin) => set({ coin: coin }),
			getCoin: () => get().coin,
			addCoin: (coin) => set({ coin: get().coin + coin }),
			removeCoin: (coin) => set({ coin: get().coin - coin }),
		}),
		{
			name: "coin-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useCoinStore;

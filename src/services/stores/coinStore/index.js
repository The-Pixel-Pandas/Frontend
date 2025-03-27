import { create } from "zustand";

const useCoinStore = create((set, get) => ({
	coin: 0,
	setCoin: (coin) => set({ coin: coin }),
	getCoin: () => get().coin,
	addCoin: (coin) => set({ coin: get().coin + coin }),
	removeCoin: (coin) => set({ coin: get().coin - coin }),
}));

export default useCoinStore;

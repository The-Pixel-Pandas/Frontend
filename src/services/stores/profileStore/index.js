import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAvatarStore from "../avatarStore";
import useMedalStore from "../medalStore";

const useProfileStore = create(
	persist(
		(set, get) => ({
			id: 0,
			isAdmin: false,
			avatarNumber: useAvatarStore.getState().avatarNumber,
			name: "نام کاربری",
			biography: "توضیحات(بیوگرافی)",
			profit: 0,
			volume: 0,
			medals: [],
			winRate: 0,
			rankTotalProfit: 0,
			rankTotalVolume: 0,

			setId: (id) => set({ id: id }),
			setAdmin: (isAdmin) => {
				set({ isAdmin: isAdmin });
			},
			setAvatarNumber: (number) => {
				useAvatarStore.getState().setAvatarNumber(number);
				set({ avatarNumber: number });
			},
			setName: (name) => set({ name }),
			setBiography: (biography) => set({ biography }),
			setProfit: (profit) => set({ profit }),
			setVolume: (volume) => set({ volume }),
			setMedals: (medalNumbers) => {
				const medals = medalNumbers.map((num) => ({
					number: num,
					src: useMedalStore.getState().getMedalByNumber(num),
				}));
				set({ medals: medals });
			},
			setWinRate: (winRate) => set({ winRate }),
			setRankTotalProfit: (rankTotalProfit) => set({ rankTotalProfit }),
			setRankTotalVolume: (rankTotalVolume) => set({ rankTotalVolume }),
			getMedalSources: () => get().medals.map((medal) => medal.src),
			reset: () =>
				set({
					id: 0,
					isAdmin: false,
					avatarNumber: 1,
					name: "نام کاربری",
					biography: "توضیحات(بیوگرافی)",
					profit: 0,
					volume: 0,
					medals: [],
					winRate: 0,
					rankTotalProfit: 0,
					rankTotalVolume: 0,
				}),
		}),
		{
			name: "profile-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useProfileStore;

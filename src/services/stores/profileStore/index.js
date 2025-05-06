import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAvatarStore from "../avatarStore";
import useMedalStore from "../medalStore";

const useProfileStore = create(
	persist(
		(set, get) => ({
			isAdmin: true,
			avatarNumber: useAvatarStore.getState().avatarNumber,
			name: "نام کاربری",
			biography: "توضیحات(بیوگرافی)",
			transaction: 0,
			volume: 0,
			rank: 0,
			medals: [],

			setAdmin: (isAdmin) => {
				set({ isAdmin: isAdmin });
			},
			setAvatarNumber: (number) => {
				useAvatarStore.getState().setAvatarNumber(number);
				set({ avatarNumber: number });
			},
			setName: (name) => set({ name }),
			setBiography: (biography) => set({ biography }),
			setTransaction: (transaction) => set({ transaction }),
			setVolume: (volume) => set({ volume }),
			setRank: (rank) => set({ rank }),
			setMedals: (medalNumbers) => {
				const medals = medalNumbers.map((num) => ({
					number: num,
					src: useMedalStore.getState().getMedalByNumber(num),
				}));
				set({ medals: medals });
			},
			getMedalSources: () => get().medals.map((medal) => medal.src),
			reset: () =>
				set({
					isAdmin: false,
					avatarNumber: 1,
					name: "نام کاربری",
					biography: "توضیحات(بیوگرافی)",
					transaction: 0,
					volume: 0,
					rank: 0,
					medals: [],
				}),
		}),
		{
			name: "profile-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useProfileStore;

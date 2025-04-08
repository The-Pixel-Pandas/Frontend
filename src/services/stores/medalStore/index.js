import { create } from "zustand";
import { persist } from "zustand/middleware";
import gold from "../../../assets/images/Medals/gold.png";
import silver from "../../../assets/images/Medals/silver.png";
import bronze from "../../../assets/images/Medals/bronze.png";

const Medals = [gold, silver, bronze];

const useMedalStore = create(
	persist(
		(set, get) => ({
			Medals: Medals,
			MedalNumber: 1,
			setMedalNumber: (MedalNumber) => set({ MedalNumber: MedalNumber }),
			getMedalNumber: () => get().MedalNumber,
			getMedalSrc: () => Medals[get().MedalNumber - 1],
			getMedalByNumber: (MedalNumber) => Medals[MedalNumber - 1],
		}),
		{
			name: "medal-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useMedalStore;

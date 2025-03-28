import { create } from "zustand";
import gold from "../../../assets/images/Medals/gold.png";
import silver from "../../../assets/images/Medals/silver.png";
import bronze from "../../../assets/images/Medals/bronze.png";

const Medals = [gold, silver, bronze];

const useMedalStore = create((set, get) => ({
	Medals: Medals,
	MedalNumber: 1,
	setMedalNumber: (MedalNumber) => set({ MedalNumber: MedalNumber }),
	getMedalNumber: () => get().MedalNumber,
	getMedalSrc: () => Medals[get().MedalNumber - 1],
	getMedalByNumber: (MedalNumber) => Medals[MedalNumber - 1],
}));

export default useMedalStore;

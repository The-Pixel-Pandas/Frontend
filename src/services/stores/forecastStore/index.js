import { create } from "zustand";
import { persist } from "zustand/middleware";

const useForecastStore = create(
	persist(
		(set, get) => ({
			removedCardIds: [],
			addRemovedCard: (cardId) =>
				set({ removedCardIds: [...get().removedCardIds, cardId] }),
			resetRemovedCards: () => set({ removedCardIds: [] }),
		}),
		{
			name: "forecast-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useForecastStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTaskStore = create(
	persist(
		(set, get) => ({
			removedCardIds: [],
			addRemovedCard: (cardId) =>
				set({ removedCardIds: [...get().removedCardIds, cardId] }),
			resetRemovedCards: () => set({ removedCardIds: [] }),
		}),
		{
			name: "task-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useTaskStore;

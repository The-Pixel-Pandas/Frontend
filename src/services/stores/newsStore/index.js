import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNewsStore = create(
	persist(
		(set, get) => ({
			news: [],
			setNews: (news) => set({ news }),
			getNews: () => get().news,
			getNewsById: (id) => get().news.find((news) => news.id === id),
			addNews: (news) => set({ news: [...get().news, news] }),
			removeNews: (id) =>
				set({ news: get().news.filter((news) => news.id !== id) }),
		}),
		{
			name: "news-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useNewsStore;

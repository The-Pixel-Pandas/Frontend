import { create } from "zustand";

const useNewsStore = create((set, get) => ({
	news: [],
	setNews: (news) => set({ news }),
	getNews: () => get().news,
	getNewsById: (id) => get().news.find((news) => news.id === id),
	addNews: (news) => set({ news: [...get().news, news] }),
	removeNews: (id) =>
		set({ news: get().news.filter((news) => news.id !== id) }),
}));

export default useNewsStore;

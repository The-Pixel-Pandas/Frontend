import { create } from "zustand";

const useQuestionStore = create((set, get) => ({
	questions: [],
	setQuestions: (questions) => set({ questions }),
	getQuestions: () => get().questions,
	getQuestionById: (id) =>
		get().questions.find((question) => question.id === id),
	addQuestion: (question) => set({ questions: [...get().questions, question] }),
	removeQuestion: (id) =>
		set({
			questions: get().questions.filter((question) => question.id !== id),
		}),
}));

export default useQuestionStore;

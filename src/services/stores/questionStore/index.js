import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQuestionStore = create(
	persist(
		(set, get) => ({
			questions: [],
			setQuestions: (questions) => set({ questions }),
			getQuestions: () => get().questions,
			getQuestionById: (id) =>
				get().questions.find((question) => question.id === id),
			addQuestion: (question) =>
				set({ questions: [...get().questions, question] }),
			removeQuestion: (id) =>
				set({
					questions: get().questions.filter((question) => question.id !== id),
				}),
		}),
		{
			name: "question-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useQuestionStore;

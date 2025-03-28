import { httpService } from "./httpService";
import useAuthStore from "./stores/authStore";
import useAvatarStore from "./stores/avatarStore";
import eventHandler from "./eventHandler";
import authYup from "./yupObjects/authYup";
import useCoinStore from "./stores/coinStore";
import useQuestionStore from "./stores/questionStore";
import useNewsStore from "./stores/newsStore";
import useMedalStore from "./stores/medalStore";

export {
	httpService,
	useAuthStore,
	eventHandler,
	authYup,
	useAvatarStore,
	useCoinStore,
	useQuestionStore,
	useNewsStore,
	useMedalStore,
};

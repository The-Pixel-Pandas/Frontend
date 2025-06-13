import { httpService } from "./httpService";
import useAuthStore from "./stores/authStore";
import useAvatarStore from "./stores/avatarStore";
import eventHandler from "./eventHandler";
import authYup from "./yupObjects/authYup";
import useCoinStore from "./stores/coinStore";
import useQuestionStore from "./stores/questionStore";
import useNewsStore from "./stores/newsStore";
import useMedalStore from "./stores/medalStore";
import useTokenStore from "./stores/tokenStore";
import useProfileStore from "./stores/profileStore";
import useForecastStore from "./stores/forecastStore";
import useTaskStore from "./stores/taskStore";
import cacheService from "./cacheService";
import userInfoYup from "./yupObjects/userInfoYup";
import userSubmitQuestionYup from "./yupObjects/userSubmitQuestionYup";
import adminSubmitTaskYup from "./yupObjects/adminSubmitTaskYup";
import userSubmitNewsYup from "./yupObjects/userSubmitNewsYup";

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
	useTokenStore,
	useProfileStore,
	useForecastStore,
	useTaskStore,
	cacheService,
	userInfoYup,
	userSubmitQuestionYup,
	adminSubmitTaskYup,
	userSubmitNewsYup,
};

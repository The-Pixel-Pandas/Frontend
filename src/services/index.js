import { httpService } from "./httpService";
import useAuthStore from "./stores/authStore";
import useAvatarStore from "./stores/avatarStore";
import eventHandler from "./eventHandler";
import authYup from "./yupObjects/authYup";
import useCoinStore from "./stores/coinStore";

export {
	httpService,
	useAuthStore,
	eventHandler,
	authYup,
	useAvatarStore,
	useCoinStore,
};

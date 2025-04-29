import useAuthStore from "../stores/authStore";
import useAvatarStore from "../stores/avatarStore";
import useCoinStore from "../stores/coinStore";
import useTokenStore from "../stores/tokenStore";
import useProfileStore from "../stores/profileStore";

const STORE_CONFIGS = [
	{ store: useAuthStore, storageKey: "auth-storage" },
	{ store: useAvatarStore, storageKey: "avatar-storage" },
	{ store: useCoinStore, storageKey: "coin-storage" },
	{ store: useTokenStore, storageKey: "token-storage" },
	{ store: useProfileStore, storageKey: "profile-storage" },
];

function reset(store, storageKey) {
	if (typeof store.getState().reset === "function") {
		store.getState().reset();
	} else {
		console.warn(`No reset() method found for ${storageKey}`);
	}

	localStorage.removeItem(storageKey);
	sessionStorage.removeItem(storageKey);
}

const cacheService = {
	reset: (storesToReset) => {
		STORE_CONFIGS.forEach(({ store, storageKey }) => {
			if (!storesToReset || storesToReset.includes(storageKey)) {
				reset(store, storageKey);
			}
		});
	},

	resetAll: () => {
		STORE_CONFIGS.forEach(({ store, storageKey }) => {
			reset(store, storageKey);
		});
	},

	set: (key, value) => {
		try {
			const json = JSON.stringify(value);
			localStorage.setItem(key, json);
		} catch (err) {
			console.error(`Failed to set item '${key}':`, err);
		}
	},

	get: (key, defaultValue = null) => {
		try {
			const json = localStorage.getItem(key);
			return json !== null ? JSON.parse(json) : defaultValue;
		} catch (err) {
			console.error(`Failed to get item '${key}':`, err);
			return defaultValue;
		}
	},

	has: (key) => {
		return localStorage.getItem(key) !== null;
	},

	delete: (key) => {
		localStorage.removeItem(key);
	},

	clearAllPrefs: () => {
		localStorage.clear();
	},
};

export default cacheService;

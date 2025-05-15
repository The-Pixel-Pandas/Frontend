import {
	httpService,
	useCoinStore,
	useAuthStore,
	useTokenStore,
	useProfileStore,
} from "../../services";

const useAuthApi = () => {
	const { email, password, setUser, setLoginMessage } = useAuthStore();

	const { setCoin } = useCoinStore();
	const { setAccessToken, setRefreshToken } = useTokenStore();
	const {
		setId,
		setAdmin,
		setAvatarNumber,
		setName,
		setBiography,
		setProfit,
		setVolume,
		setMedals,
		setWinRate,
		setRankTotalProfit,
		setRankTotalVolume,
	} = useProfileStore();

	const handleAuthAPI = (URL, data, authType) => {
		httpService
			.post(URL, data)
			.then((res) => {
				console.log("Login/Signin API response:", res);
				setUser(email, password);
				setSuccessInformation(res, authType);
			})
			.catch((err) => {
				console.log("Login/Signin API error:", err);
				setUser(email, password, false, false);
				setErrorInformation(err);
			});
	};

	const setErrorInformation = (err) => {
		if (err.non_field_errors) {
			setLoginMessage("ایمیل یا رمز عبور اشتباه است");
		} else if (err.gmail) {
			setLoginMessage("کاربری با این ایمیل قبلا ثبت شده است");
		} else if (err.password) {
			setLoginMessage("رمز عبور اشتباه است");
		} else {
			setLoginMessage("خطایی رخ داده است");
		}
	};

	const setSuccessInformation = (data, authType) => {
		setCoin(data.user.total_balance);
		setAccessToken(data.tokens?.access || data.access);
		setRefreshToken(data.tokens?.refresh || data.refresh);
		setAdmin(data.is_admin);
		setId(data.user.id);
		setAvatarNumber(data.user.avatar);
		setName(data.user.user_name);
		setBiography(data.user.bio);
		setProfit(data.user.profit);
		setVolume(data.user.volume);
		setMedals(data.user.medals);
		setWinRate(data.user.win_rate);
		setRankTotalProfit(data.user.rank_total_profit);
		setRankTotalVolume(data.user.rank_total_volume);
		setLoginMessage(`${authType} با موفقیت انجام شد`);
	};

	return {
		handleAuthAPI,
	};
};

export default useAuthApi;

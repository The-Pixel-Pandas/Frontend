import { useState } from "react";

const useCoinChooser = (initialCoin) => {
	const [coin, setCoin] = useState(initialCoin);

	const increaseCoin = () => {
		setCoin(coin + 1);
	};
	const decreaseCoin = () => {
		if (coin > 1) {
			setCoin(coin - 1);
		}
	};

	return {
		coin,
		increaseCoin,
		decreaseCoin,
	};
};

export default useCoinChooser;

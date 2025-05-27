import { useState } from "react";

const useCoinChooser = (initialCoin, limit = Infinity) => {
	const [coin, setCoin] = useState(initialCoin);

	const increaseCoin = () => {
		if (coin < limit) {
			setCoin(coin + 1);
		}
	};
	const decreaseCoin = () => {
		if (coin > initialCoin) {
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

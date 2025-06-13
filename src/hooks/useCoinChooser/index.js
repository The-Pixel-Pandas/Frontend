import { useState } from "react";

const useCoinChooser = (initialCoin, limit = Infinity) => {
	const [coin, setCoin] = useState(initialCoin);

	const increaseCoin = () => {
		if (coin < limit) {
			setCoin(coin + 100);
		}
	};
	const decreaseCoin = () => {
		if (coin > initialCoin) {
			setCoin(coin - 100);
		}
	};

	return {
		coin,
		increaseCoin,
		decreaseCoin,
	};
};

export default useCoinChooser;

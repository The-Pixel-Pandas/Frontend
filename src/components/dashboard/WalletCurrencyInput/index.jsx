import React from "react";
import PropTypes from "prop-types";
import { useCoinChooser } from "../../../hooks";
import walletQuantityBox from "../../../assets/images/walletQuantityBox.png";
import walletIncreaseBtn from "../../../assets/images/walletIncreaseBtn.png";
import walletDecreaseBtn from "../../../assets/images/walletDecreaseBtn.png";

const WalletCurrencyInput = ({
	initialCoin = 0,
	limit = Infinity,
	onChange,
	unitType,
	size = {
		width: 380,
		height: 60,
		btnWeight: 60,
		btnHeight: 40,
	},
}) => {
	const { coin, increaseCoin, decreaseCoin } = useCoinChooser(
		initialCoin,
		limit
	);

	const handleChange = (newCoin) => {
		onChange(newCoin);
	};

	return (
		<>
			<div className="relative">
				<img
					src={walletQuantityBox}
					alt="walletQuantityBox"
					style={{ width: size.width, height: size.height }}
					className="z-10"
				/>
				<div className="absolute inset-0 z-50 flex items-center flex-row gap-56 pr-2.5 pl-2.5">
					<button
						onClick={() => handleChange(decreaseCoin())}
						className="outline-none border-none transition duration-200 ease-in-out transform hover:scale-110 ml-3"
					>
						<img
							src={walletDecreaseBtn}
							alt="walletDecreaseBtn"
							style={{ width: size.btnWeight, height: size.btnHeight }}
						/>
					</button>
					<button
						onClick={() => handleChange(increaseCoin())}
						className="outline-none border-none transition duration-200 ease-in-out transform hover:scale-110 mr-3"
					>
						<img
							src={walletIncreaseBtn}
							alt="walletIncreaseBtn"
							style={{ width: size.btnWeight, height: size.btnHeight }}
						/>
					</button>
				</div>
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					<div className="flex flex-row items-center gap-2" dir="rtl">
						<div className="text-white font-MorabbaMedium text-xl whitespace-nowrap">
							{coin.toLocaleString("fa")}
						</div>
						<div className="text-white font-MorabbaMedium text-xl whitespace-nowrap">
							{unitType}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

WalletCurrencyInput.propTypes = {
	initialCoin: PropTypes.number,
	limit: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	unitType: PropTypes.string.isRequired,
	size: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number,
		btnWeight: PropTypes.number,
		btnHeight: PropTypes.number,
	}),
};

export default WalletCurrencyInput;

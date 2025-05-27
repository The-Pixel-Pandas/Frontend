import React from "react";
import PropTypes from "prop-types";
import walletLossIcon from "../../../assets/images/walletLossIcon.png";
import walletProfitIcon from "../../../assets/images/walletProfitIcon.png";

const WalletHistoryItem = ({ isProfit, amount }) => {
	return (
		<div className="flex flex-row items-center gap-2 ml-16" dir="rtl">
			<img
				src={isProfit ? walletProfitIcon : walletLossIcon}
				alt="walletLossIcon"
				className="scale-90"
			/>
			<div
				className={`text-xl font-MorabbaBold ${isProfit ? "text-green-500" : "text-red-500"}`}
			>
				{amount}
			</div>
		</div>
	);
};

WalletHistoryItem.propTypes = {
	isProfit: PropTypes.bool.isRequired,
	amount: PropTypes.number.isRequired,
};

export default WalletHistoryItem;

import React from "react";
import PropTypes from "prop-types";
import walletLossIcon from "../../../assets/images/walletLossIcon.png";
import walletProfitIcon from "../../../assets/images/walletProfitIcon.png";

const WalletHistoryItem = ({ isProfit, amount, type, date }) => {
	let text;
	if (type === "TASK_REWARD") {
		text = "تکمیل تسک";
	} else if (type === "WIN") {
		text = "بردن در پیشبینی";
	} else if (type === "BET") {
		text = "سرمایه گذاری در پیشبینی";
	}
	return (
		<>
			{text && (
				<div className="flex flex-row items-center gap-3" dir="rtl">
					<img
						src={isProfit ? walletProfitIcon : walletLossIcon}
						alt="wallet icon"
						className="scale-90"
					/>
					<div
						className={`text-sm font-MorabbaBold ${isProfit ? "text-green-400" : "text-red-400"}`}
					>
						{amount}
					</div>
					<div
						className={`text-sm text-nowrap font-MorabbaMedium ${isProfit ? "text-green-500" : "text-red-400"}`}
					>
						{text}
					</div>
					<div
						className={`text-sm text-nowrap font-MorabbaMedium ${isProfit ? "text-green-600" : "text-red-500"}`}
					>
						{new Intl.DateTimeFormat("fa-IR", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
						}).format(new Date(date))}
					</div>
				</div>
			)}
		</>
	);
};

WalletHistoryItem.propTypes = {
	isProfit: PropTypes.bool.isRequired,
	amount: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
};

export default WalletHistoryItem;

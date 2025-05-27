import React from "react";
import PropTypes from "prop-types";
import walletCtrlBtn from "../../../assets/images/walletCtrlBtn.png";
import withdrawalIcon from "../../../assets/images/withdrawalIcon.png";
import depositeIcon from "../../../assets/images/depositeIcon.png";

const WalletBalanceCtrlBtn = ({ onClick, type = "withdrawal" }) => {
	let icon;
	let text;
	if (type !== "withdrawal") {
		icon = withdrawalIcon;
		text = "برداشت";
	} else {
		icon = depositeIcon;
		text = "واریز";
	}
	return (
		<>
			<button onClick={onClick} className="outline-none border-none">
				<div className="relative">
					<img
						src={walletCtrlBtn}
						alt="walletCtrlBtn"
						style={{ width: 150, height: 50 }}
					/>
					<div className="absolute inset-0 z-50 flex flex-row gap-0.5 items-center justify-center pr-5 ">
						<img
							src={icon}
							alt="withdrawalIcon"
							style={{ width: 50, height: 40 }}
						/>
						<div className="text-white font-MorabbaMedium text-xl whitespace-nowrap">
							{text}
						</div>
					</div>
				</div>
			</button>
		</>
	);
};

WalletBalanceCtrlBtn.propTypes = {
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default WalletBalanceCtrlBtn;

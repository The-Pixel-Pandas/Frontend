import React, { useState } from "react";
import PropTypes from "prop-types";
import PercentageButton from "../PercentageButton";
import exchangeBoxContainer from "../../../../assets/images/exchangeBoxContainer.png";
import drop from "../../../../assets/images/drop.png";
import exchangeCoinInput from "../../../../assets/images/exchangeCoinInput.png";
import increaseButton from "../../../../assets/images/increaseButton.png";
import decreaseButton from "../../../../assets/images/decreaseButton.png";
import exchangeBtn from "../../../../assets/images/exchangeBtn.png";

const ExchangeBox = ({ yesPercentage, noPercentage }) => {
	const [coin, setCoin] = useState(10);
	const increaseCoin = () => {
		setCoin(coin + 1);
	};
	const decreaseCoin = () => {
		setCoin(coin - 1);
	};

	const handleExchange = () => {
		console.log("Exchange");
	};

	return (
		<>
			<div className="flex justify-center items-center flex-col mt-5">
				<div className="relative ">
					<div className="flex flex-col gap-14 absolute inset-0 top-16">
						<PercentageButton percentage={yesPercentage} text="بله" />
						<PercentageButton percentage={noPercentage} text="نه" />
					</div>

					<div className="absolute right-5 top-2 flex flex-row items-center gap-2">
						<span className="text-white font-MorabbaRegular text-lg">خرید</span>
						<img src={drop} alt="drop" style={{ width: 15, height: 15 }} />
					</div>

					<div className="absolute inset-0 top-1/2 flex items-center justify-center mb-10">
						<div className="flex flex-row gap-5">
							<button
								onClick={decreaseCoin}
								className="text-white font-MorabbaRegular text-lg"
							>
								<img
									src={decreaseButton}
									alt="coinFuncButton"
									style={{ width: 30, height: 30 }}
								/>
							</button>
							<div className="relative">
								<div className="absolute inset-0 left-10 -translate-x-1/2 items-center flex">
									<span
										className="text-white font-MorabbaMedium text-sm whitespace-nowrap "
										dir="rtl"
									>{`${coin.toLocaleString("fa")} ${String.fromCharCode(0x00a0)} پانداکوین`}</span>
								</div>
								<img
									src={exchangeCoinInput}
									alt="exchangeCoinInput"
									style={{ width: 97, height: 40 }}
								/>
							</div>
							<button
								onClick={increaseCoin}
								className="text-white font-MorabbaRegular text-lg"
							>
								<img
									src={increaseButton}
									alt="coinFuncButton"
									style={{ width: 30, height: 30 }}
								/>
							</button>
						</div>
					</div>

					<div className="absolute inset-0 top-1/2 flex items-center justify-center mt-20">
						<button
							type="button"
							className="focus:outline-none hover:opacity-90"
							onClick={handleExchange}
						>
							<div className="relative">
								<div className="absolute inset-0 flex items-center justify-center items-center ">
									<span className="text-white font-Lalezar text-lg mb-1">
										مبادله
									</span>
								</div>
								<img
									src={exchangeBtn}
									alt="exchangeBtn"
									style={{ width: 200, height: 41 }}
								/>
							</div>
						</button>
					</div>

					<img
						src={exchangeBoxContainer}
						alt="exchangeBoxContainer"
						style={{ width: 300, height: 275 }}
					/>
				</div>
			</div>
		</>
	);
};

ExchangeBox.propTypes = {
	yesPercentage: PropTypes.number,
	noPercentage: PropTypes.number,
};

export default ExchangeBox;

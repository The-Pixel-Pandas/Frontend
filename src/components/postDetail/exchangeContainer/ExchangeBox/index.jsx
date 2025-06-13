import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCoinStore, useAuthStore, httpService } from "../../../../services";
import { useCoinChooser } from "../../../../hooks";
import { Toast } from "../../../chore";
import PercentageButton from "../PercentageButton";
import exchangeBoxContainer from "../../../../assets/images/exchangeBoxContainer.png";
import drop from "../../../../assets/images/drop.png";
import exchangeCoinInput from "../../../../assets/images/exchangeCoinInput.png";
import increaseButton from "../../../../assets/images/increaseButton.png";
import decreaseButton from "../../../../assets/images/decreaseButton.png";
import exchangeBtn from "../../../../assets/images/exchangeBtn.png";

const ExchangeBox = ({ yesPercentage, noPercentage, updateAction }) => {
	const [showToast, setShowToast] = useState(false);
	const [isError, setIsError] = useState(false);
	const [ToastMessage, setToastMessage] = useState("");
	const [buttonPositions, setButtonPositions] = useState({
		yes: true,
		no: true,
	});
	const [exchangeType, setExchangeType] = useState("");
	const { getCoin, setCoin } = useCoinStore();
	const { isAuthenticated } = useAuthStore();
	const { coin, increaseCoin, decreaseCoin } = useCoinChooser(100);

	const handleTogglePosition = (id) => {
		setButtonPositions((prev) => {
			if (prev[id]) {
				const otherId = id === "yes" ? "no" : "yes";
				return {
					...prev,
					[id]: false,
					[otherId]: true,
				};
			} else {
				return {
					...prev,
					[id]: true,
				};
			}
		});
		if (
			(id == "yes" && buttonPositions.yes) ||
			(id == "no" && buttonPositions.no)
		) {
			setExchangeType(id == "yes" ? "بله" : "نه");
		}
	};

	const handleExchangeAPI = () => {
		const id =
			exchangeType == "بله" ? yesPercentage.option_id : noPercentage.option_id;
		const data = {
			amount: coin,
		};
		httpService
			.post(`options/${id}/bets/`, data)
			.then((res) => {
				console.log("Bet API Response:", res);
				setIsError(false);
				setCoin(res.remaining_balance);
				updateAction(res);
				setToastMessage(`مبادله با موفقیت روی "${exchangeType}" انجام شد`);
			})
			.catch((err) => {
				console.log("Bet API Error:", err);
				setIsError(true);
				setToastMessage("این پیشبینی بسته شده است");
			});
	};

	const handleExchange = () => {
		setShowToast(true);

		if (!isAuthenticated) {
			setIsError(true);
			setToastMessage("لطفا ابتدا وارد حساب کاربری شوید");
			return;
		}

		if (buttonPositions.yes == true && buttonPositions.no == true) {
			setIsError(true);
			setToastMessage("لطفا ابتدا مورد مبادله را مشخص کنید");
			return;
		}

		if (getCoin() < coin) {
			setIsError(true);
			setToastMessage("تعداد پانداکوین کافی نیست");
			return;
		}
		handleExchangeAPI();
	};

	useEffect(() => {
		if (ToastMessage) {
			setTimeout(() => {
				setToastMessage("");
				setShowToast(false);
			}, 2000);
		}
		return () => {
			clearTimeout();
		};
	}, [ToastMessage, showToast]);

	return (
		<>
			<div className="flex justify-center items-center flex-col mt-5">
				<div className="relative ">
					{/* Yes/No Percentage */}
					<div className="flex flex-col gap-14 absolute inset-0 top-17">
						<PercentageButton
							percentage={Math.ceil(yesPercentage.chance)}
							text="بله"
							isRight={buttonPositions.yes}
							onTogglePosition={handleTogglePosition}
							id="yes"
						/>
						<PercentageButton
							percentage={Math.ceil(noPercentage.chance)}
							text="نه"
							isRight={buttonPositions.no}
							onTogglePosition={handleTogglePosition}
							id="no"
						/>
					</div>

					{/* Title */}
					<div className="absolute right-5 top-2 flex flex-row items-center gap-2">
						<div className="text-white font-MorabbaMedium text-lg ">
							پیشبینی
						</div>
						<img src={drop} alt="drop" style={{ width: 15, height: 15 }} />
					</div>

					{/* Coin Input */}
					<div className="absolute inset-0 top-1/2 flex items-center justify-center mb-10">
						<div className="flex flex-row gap-5">
							<button
								onClick={decreaseCoin}
								className="text-white font-MorabbaRegular text-lg focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
							>
								<img
									src={decreaseButton}
									alt="coinFuncButton"
									style={{ width: 30, height: 30 }}
								/>
							</button>
							<div className="relative">
								<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center flex">
									<span className=" text-white font-MorabbaMedium whitespace-nowrap  font-bold text-xl text-center">
										{coin.toLocaleString("fa")}
									</span>
								</div>
								<img
									src={exchangeCoinInput}
									alt="exchangeCoinInput"
									style={{ width: 97, height: 40 }}
								/>
							</div>
							<button
								onClick={increaseCoin}
								className="text-white font-MorabbaRegular text-lg focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
							>
								<img
									src={increaseButton}
									alt="coinFuncButton"
									style={{ width: 30, height: 30 }}
								/>
							</button>
						</div>
					</div>
					{/* Exchange Button */}
					<div className="absolute inset-0 top-1/2 flex items-center justify-center mt-20">
						<button
							type="button"
							className="focus:outline-none hover:opacity-85 hover:scale-105 transition-all duration-300"
							onClick={handleExchange}
						>
							<div className="relative">
								<div className="absolute inset-0 flex items-center justify-center items-center ">
									<span className="text-white font-Lalezar text-lg mb-1">
										خرید
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
					{/* Toasts */}
					{showToast && isError && (
						<div className="absolute inset-0">
							<Toast
								type="error"
								message={ToastMessage}
								position="bottom-left"
							/>
						</div>
					)}
					{showToast && !isError && (
						<div className="absolute inset-0">
							<Toast
								type="success"
								message={ToastMessage}
								position="bottom-left"
							/>
						</div>
					)}
					{/* Background Image */}
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
	updateAction: PropTypes.func,
};

export default ExchangeBox;

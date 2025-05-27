import React, { useEffect, useState } from "react";
import {
	AnimateCoinLogo,
	WalletBalanceCtrlBtn,
	WalletCurrencyInput,
	WalletHistoryItem,
	Toast,
} from "../../../../components";
import { useToast } from "../../../../hooks";
import { httpService, useCoinStore } from "../../../../services";
import walletBackground from "../../../../assets/images/walletBackground.png";
import walletSection from "../../../../assets/images/walletSection.png";
import walletIncreaseBox from "../../../../assets/images/walletIncreaseBox.png";
import lockIcon from "../../../../assets/images/lockIcon.png";
import walletBuyButton from "../../../../assets/images/walletBuyButton.png";
import walletHistory from "../../../../assets/images/walletHistory.png";

const Wallet = () => {
	const unitInterval = {
		initialToman: 1000,
		initialCoin: 100,
		limitToman: 1000000,
		limitCoin: 1000000,
	};

	const [selectedToman, setSelectedToman] = useState(unitInterval.initialToman);
	const [selectedCoin, setSelectedCoin] = useState(unitInterval.initialCoin);
	const [, setBalance] = useState(unitInterval.initialCoin);
	const { coin, addCoin } = useCoinStore();
	const [history, setHistory] = useState([]);
	const { toastMessage, isSubmitted, isError, showToast } = useToast(5000);

	useEffect(() => {
		httpService
			.get("https://mocki.io/v1/78dee0d3-ad95-4f9b-be80-40c7d24ed477")
			.then((res) => {
				setHistory(res);
				console.log("Wallet History Get API:", res);
			})
			.catch((err) => console.error("Wallet History Get API Error:", err));
	}, []);

	const manageExchange = () => {
		showToast(
			` مقدار ${selectedToman.toLocaleString("fa")} تومان به پاندا کوین تبدیل شد`,
			false
		);
		addCoin(selectedCoin);
	};

	return (
		<>
			<div className="absolute left-0 top-0 flex items-center z-0 ml-14 mt-10">
				<div className="relative">
					{/* BackGround Image */}
					<img
						src={walletBackground}
						alt="dashboardContainer"
						style={{ width: 1100, height: 600 }}
					/>
					{/* Right Section */}
					<div className="absolute inset-0 z-50 flex items-center justify-center ml-[500px]">
						<div className="relative">
							<img
								src={walletSection}
								alt="walletSection"
								style={{ width: 500, height: 550 }}
							/>
							<div className="absolute inset-0 z-50 flex items-center  flex-col gap-14 mt-10">
								{/* Balance Show */}
								<div className="flex flex-row items-center justify-center mr-10">
									<div>
										<AnimateCoinLogo width={215} height={165} />
									</div>
									<div
										className=" text-white font-MorabbaBold text-3xl whitespace-nowrap text-center flex flex-col mr-7 gap-8"
										dir="rtl"
									>
										<div>موجودی کیف پول</div>
										<div>{coin.toLocaleString("fa")} </div>
									</div>
								</div>
								{/* Balance Management Section */}
								<div className="relative">
									<img
										src={walletIncreaseBox}
										alt="walletIncreaseBox"
										style={{ width: 400, height: 270 }}
										className="z-10"
									/>
									<div className="absolute inset-0 z-50 flex items-center">
										<div
											className="flex flex-row items-center gap-3 right-10 top-5 absolute"
											dir="rtl"
										>
											<img
												src={lockIcon}
												alt="lockIcon"
												style={{ width: 30, height: 30 }}
											/>
											<div className="text-2xl text-white font-MorabbaMedium">
												مدیریت دارایی ها
											</div>
										</div>
										<div className="absolute inset-0 z-50 flex items-center justify-center mb-2 mr-0.5">
											<WalletCurrencyInput
												onChange={setBalance}
												unitType="پاندا کوین"
												initialCoin={unitInterval.initialCoin}
												limit={coin}
												size={{
													width: 360,
													height: 70,
													btnWeight: 60,
													btnHeight: 40,
												}}
											/>
										</div>
										<div className="flex flex-row items-center justify-center gap-5 left-10 bottom-7 absolute">
											<WalletBalanceCtrlBtn
												onClick={() => {
													showToast("این بخش در حال حاضر غیر فعال است", true);
												}}
												type="deposite"
											/>
											<WalletBalanceCtrlBtn
												onClick={() => {
													showToast("این بخش در حال حاضر غیر فعال است", true);
												}}
												type="withdrawal"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Left Section */}
					<div className="absolute inset-0 z-50 flex items-center  flex-col gap-2 mt-14 mr-[600px]">
						{/* Exchange Currency */}

						<div className="text-white text-3xl font-MorabbaBold mb-3">
							معامله
						</div>
						<WalletCurrencyInput
							onChange={setSelectedToman}
							unitType="تومان"
							initialCoin={unitInterval.initialToman}
							limit={unitInterval.limitToman}
						/>
						<div className="text-white text-lg font-MorabbaMedium">معادل</div>
						<WalletCurrencyInput
							onChange={setSelectedCoin}
							unitType="پاندا کوین"
							initialCoin={unitInterval.initialCoin}
							limit={unitInterval.limitCoin}
						/>
						<button
							className="absolute inset-0 flex items-center justify-center mb-2 hover:scale-105 transition ease-in-out "
							onClick={manageExchange}
						>
							<img
								src={walletBuyButton}
								alt="walletBuyButton"
								style={{ width: 361, height: 57 }}
							/>
							<div className="absolute inset-0  flex items-center justify-center">
								<div className="text-white text-xl font-MorabbaMedium">
									خرید
								</div>
							</div>
						</button>
						{/* Exchange History */}
						<div className="relative mt-[90px]">
							<img
								src={walletHistory}
								alt="walletHistory"
								style={{ width: 380, height: 200 }}
								className="z-10"
							/>
							<div
								className="absolute inset-0 z-50 flex flex-col mt-2.5 mr-7 gap-2.5"
								dir="rtl"
							>
								<div className="text-white text-2xl font-MorabbaMedium whitespace-nowrap">
									تاریخچه سود و ضرر
								</div>
								<div className="flex flex-col gap-2 mt-1 pb-2 max-h-[150px] overflow-y-scroll no-scrollbar">
									{history.map((item, index) => {
										return (
											<WalletHistoryItem
												key={index}
												isProfit={item.isProfit}
												amount={item.amount}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Toast */}
			{isSubmitted && !isError && (
				<Toast type="success" message={toastMessage} position="top-center" />
			)}
			{isSubmitted && isError && (
				<Toast type="error" message={toastMessage} position="top-center" />
			)}
		</>
	);
};

export default Wallet;

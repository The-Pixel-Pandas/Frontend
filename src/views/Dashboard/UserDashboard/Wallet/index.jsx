import React from "react";
import { AnimateCoinLogo, BalanceCtrlBtn } from "../../../../components";
import walletBackground from "../../../../assets/images/walletBackground.png";
import walletSection from "../../../../assets/images/walletSection.png";
import walletIncreaseBox from "../../../../assets/images/walletIncreaseBox.png";
import lockIcon from "../../../../assets/images/lockIcon.png";

const Wallet = () => {
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
					{/* Wallet Section */}
					<div className="absolute inset-0 z-50 flex items-center justify-center ml-[500px]">
						<div className="relative">
							<img
								src={walletSection}
								alt="walletSection"
								style={{ width: 500, height: 550 }}
							/>
							{/* Balance Show Section */}
							<div className="absolute inset-0 z-50 flex items-center  flex-col gap-14 mt-10">
								<div className="flex flex-row items-center justify-center mr-10">
									<div>
										<AnimateCoinLogo width={215} height={165} />
									</div>
									<div
										className=" text-white font-MorabbaBold text-3xl whitespace-nowrap text-center flex flex-col mr-7 gap-8"
										dir="rtl"
									>
										<div>موجودی کیف پول</div>
										<div>{(12345).toLocaleString("fa")} </div>
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
										<div className="flex flex-row items-center justify-center gap-5 left-10 bottom-7 absolute">
											<BalanceCtrlBtn onClick={() => {}} type="deposite" />
											<BalanceCtrlBtn onClick={() => {}} type="withdrawal" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Wallet;

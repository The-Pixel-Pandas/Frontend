import React, { useEffect, useState } from "react";
import avatarInfoContainer from "../../assets/images/avatarInfoContainer.png";
import avatarBorder from "../../assets/images/avatarBorder.png";
import { useAvatarStore } from "../../services";

const UserInfo = () => {
	const { avatars, setAvatarNumber, getAvatarNumber } = useAvatarStore();
	const [selectedAvatar, setSelectedAvatar] = useState(0);

	const handleAvatarSelect = (index) => {
		setSelectedAvatar(index);
		setAvatarNumber(index + 1);
	};

	useEffect(() => {
		setSelectedAvatar(getAvatarNumber() - 1);
	}, [getAvatarNumber()]);

	return (
		<>
			<div className="absolute inset-0 left-1/2 -translate-x-1/2 mt-16 ml-40">
				{/* Avatar Selector */}
				<div className="flex flex-col gap-0.5">
					{/* Title */}
					<div className="text-white font-MorabbaMedium text-lg ml-72">
						آواتار موردنظر را انتخاب کنید
					</div>

					{/* Avatars */}
					<div className="relative">
						{/* Container */}
						<img
							src={avatarInfoContainer}
							alt="avatarInfoContainer"
							className="w-[500px] h-[100px]"
						/>

						{/* Avatar scrollable container */}
						<div className="absolute inset-0 left-6 top-3 right-10 pr-2 ">
							<div
								className="flex flex-row gap-5 overflow-x-auto w-[460px] pb-2 no-scrollbar  "
								dir="rtl"
							>
								{avatars.map((avatar, index) => (
									<div
										key={index}
										className={`relative flex-shrink-0 cursor-pointer ${selectedAvatar === index ? "opacity-100" : "opacity-80"}`}
										onClick={() => handleAvatarSelect(index)}
									>
										<img
											src={avatar}
											alt={`avatar-${index + 1}`}
											className="w-[76px] h-[76px] object-contain"
										/>
										<div className="absolute inset-0">
											<img
												src={avatarBorder}
												alt="avatarBorder"
												className={`w-[75px] h-[76px] object-contain ${selectedAvatar === index ? "opacity-100" : "hidden"}`}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* TODO: Use this template to implement other parts */}
				<div className="flex flex-col gap-0.5">
					<div className="text-white font-MorabbaMedium text-lg ml-96 pl-1">
						نام کاربری
					</div>

					<div className="relative">
						{/* TODO: Import correct source of that here */}
						<img
							src={avatarInfoContainer}
							alt="avatarInfoContainer"
							className="w-[500px] h-[100px]"
						/>
						{/* TODO: Add Input or dropdown and change className related usage */}
						<div className="absolute inset-0 left-6 top-3 right-10 pr-2 "></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfo;

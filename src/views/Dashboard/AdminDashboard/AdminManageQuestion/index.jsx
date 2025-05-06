import React, { useEffect, useState } from "react";
import { ManageCard, ManageButton } from "../../../../components";
import adminContainer from "../../../../assets/images/adminContainer.png";
import checkTrue from "../../../../assets/images/checkTrue.png";
import checkFalse from "../../../../assets/images/checkFalse.png";
import checkTrueClicked from "../../../../assets/images/checkTrueClicked.png";
import checkFalseClicked from "../../../../assets/images/checkFalseClicked.png";

const AdminManageQuestion = () => {
	const [isConfirm, setIsConfirm] = useState(false);
	const [isReject, setIsReject] = useState(false);

	const handleConfirm = () => {
		setIsConfirm(true);
		setIsReject(false);
	};
	const handleReject = () => {
		setIsConfirm(false);
		setIsReject(true);
	};

	useEffect(() => {
		setTimeout(() => {
			setIsConfirm(false);
			setIsReject(false);
		}, 1000);
	}, [isConfirm, isReject]);

	return (
		<>
			<div className="absolute  left-0 top-0 flex items-center z-0 ml-14">
				<div className="relative">
					{/* Manage Container */}
					<img
						src={adminContainer}
						alt="adminContainer"
						style={{ width: 1100, height: 600 }}
						className="mt-10"
					/>

					<div className="absolute inset-0 z-50 flex items-center justify-center mt-12">
						<ManageCard
							title="گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری"
							description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
							coin={10}
							categories={["برنامه نویسی", "برنامه نویسی", "برنامه نویسی"]}
						/>
					</div>

					{/* Manage Button */}
					<div className="absolute inset-0 z-50 flex items-center ">
						<div className="flex flex-row">
							{/* Reject Button */}
							<button
								className="absolute left-0 ml-14"
								onClick={handleReject}
								style={{ width: 80, height: 80 }}
							>
								<ManageButton
									clickState={isReject}
									check={checkFalse}
									checkClicked={checkFalseClicked}
								/>
							</button>
							{/* Confirm Button */}
							<button
								className="absolute right-0 mr-14 "
								onClick={handleConfirm}
								style={{ width: 80, height: 80 }}
							>
								<ManageButton
									clickState={isConfirm}
									check={checkTrue}
									checkClicked={checkTrueClicked}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminManageQuestion;

import React from "react";
import PropTypes from "prop-types";
import databox from "../../../assets/images/dataBox.png";
import dataCategory from "../../../assets/images/dataCategory.png";
import clock from "../../../assets/images/clock.png";
import coinLogo from "../../../assets/images/coinLogo.png";

const DataContainer = ({
	width,
	height,
	title,
	description,
	image,
	categories,
	coins,
	date,
	isExchange = true,
}) => {
	return (
		<div className="flex justify-center items-center w-full">
			<div className="relative" style={{ width, height }}>
				<img
					src={databox}
					alt="dataContainer"
					className="absolute inset-0 w-full h-full"
				/>

				{/* Content Container */}
				<div className="absolute inset-0 flex flex-row p-10" dir="rtl">
					{/* Image */}
					<div className="flex-shrink-0">
						<img src={image} alt="sample" className="w-20 h-20 object-cover" />
					</div>

					{/* Text Content */}
					<div className="flex-grow pr-6">
						<p className="text-white text-3xl font-Lalezar">{title}</p>
						<div
							className="text-white text-2xl font-MorabbaMedium mt-5"
							style={{ width: "93%" }}
						>
							{description}
						</div>
						<div className="flex flex-row gap-4 items-center absolute bottom-5 left-10">
							{isExchange && (
								<div className="flex flex-row gap-0 items-center">
									<img src={coinLogo} alt="coinLogo" className="w-14 h-12" />
									<p className="text-white text-lg font-MorabbaRegular">
										{coins.toLocaleString("fa")} &nbsp; حجم پاندا کوین
									</p>
								</div>
							)}
							{date && (
								<div className="flex flex-row gap-2 items-center">
									<img src={clock} alt="clock" className="w-5 h-5" />
									<p className="text-white text-lg font-MorabbaRegular">
										{date.toLocaleString("fa")}
									</p>
								</div>
							)}
						</div>
					</div>

					{/* Categories */}
					<div className="absolute bottom-5 right-10 flex flex-row gap-2 mr-10">
						{categories.map((category, index) => (
							<div key={index} className="relative">
								<img
									src={dataCategory}
									alt="dataCategory"
									className="w-30 h-8"
								/>
								<div className="absolute inset-0 flex items-center justify-center text-white text-lg font-MorabbaRegular whitespace-nowrap">
									{category}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

DataContainer.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	categories: PropTypes.array.isRequired,
	coins: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	isExchange: PropTypes.bool,
};

export default DataContainer;

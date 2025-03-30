import React from "react";
import PropTypes from "prop-types";
import databox from "../../assets/images/databox.png";
import dataCategory from "../../assets/images/dataCategory.png";

const DataContainer = ({
	width,
	height,
	title,
	description,
	image,
	categories,
}) => {
	return (
		<>
			<div className="relative" style={{ width, height }}>
				<img src={databox} alt="dataContainer" className="absolute inset-0" />
				<div className="absolute inset-0 top-0 right-0 mr-10 mt-10" dir="rtl">
					<img
						src={image}
						alt="sample"
						className="absolute inset-0"
						style={{ width: 80, height: 80 }}
					/>
					<div className="absolute inset-0 top-0 right-0 mt-6 mr-24">
						<div className="text-white  text-3xl font-Lalezar">{title}</div>
						<div
							className="text-white  text-2xl font-MorabbaRegular mt-5"
							style={{ width: "80%" }}
						>
							{description}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

DataContainer.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	categories: PropTypes.array.isRequired,
};

export default DataContainer;

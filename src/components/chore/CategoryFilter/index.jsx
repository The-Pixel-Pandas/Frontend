import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const categories = [
	"همه موارد",
	"ورزشی",
	"سیاسی",
	"اجتماعی",
	"اقتصادی",
	"رمز ارز ها",
	"موسیقی",
];

const CategoryFilter = ({ onSelect }) => {
	const [activeCategory, setActiveCategory] = useState(categories[0]);

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		onSelect(category);
	};

	return (
		<div className="flex p-4 mr-24" dir="rtl">
			{categories.map((category) => (
				<button
					key={category}
					className={`px-6 py-2 transition-all duration-300 relative rounded-full text-lg font-MorabbaMedium ${
						activeCategory === category ? "text-white" : "text-purple-500"
					}`}
					onClick={() => handleCategoryClick(category)}
				>
					{category}
					<div
						className={`absolute bottom-0 left-0 right-0 h-0.5  ${
							activeCategory === category ? "bg-white" : "bg-purple-500"
						}`}
					/>
				</button>
			))}
		</div>
	);
};

CategoryFilter.propTypes = {
	onSelect: PropTypes.func.isRequired,
};

export default CategoryFilter;

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

const CategoryFilter = () => {
	const [activeCategory, setActiveCategory] = useState(categories[0]);

	return (
		<div className="flex space-x-2 justify-center p-4">
			{categories.map((category) => (
				<button
					key={category}
					className={`px-4 py-2 rounded-full border-2 transition-all duration-300 text-white text-sm ${
						activeCategory === category
							? "border-blue-400 text-blue-400"
							: "border-purple-500 text-purple-500"
					}`}
					onClick={() => {
						setActiveCategory(category);
						// onSelect(category);
					}}
				>
					{category}
				</button>
			))}
		</div>
	);
};

CategoryFilter.propTypes = {
	onSelect: PropTypes.func.isRequired,
};

export default CategoryFilter;

import React, { useState } from "react";
import PropTypes from "prop-types";
import searchIcon from "../../../assets/images/SearchIcon.png";

const SearchBar = ({ width = "535px", searchAction }) => {
	const [searchText, setSearchText] = useState("");

	const handleSearch = () => {
		searchAction(searchText);
		setSearchText("");
	};

	return (
		<>
			<div className="relative flex" style={{ width }}>
				<div className="relative w-full">
					<div className="absolute inset-y-0 right-0 flex items-center pr-3 z-50">
						<button
							onClick={handleSearch}
							className="outline-none hover:scale-125 transition duration-200 ease-in-out"
						>
							<img src={searchIcon} alt="SearchIcon" />
						</button>
					</div>
					<input
						type="search"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearch();
							}
						}}
						className="relative m-0 block w-full rounded-md b bg-white bg-clip-padding px-3 py-[0.25rem] pr-10 text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-gray/400  motion-reduce:transition-none font-MorabbaRegular"
						placeholder=" جستجوی سوال ها براساس عنواین و تگ ها ..."
						aria-label="Search"
						id="exampleFormControlInput2"
						dir="rtl"
					/>
				</div>
			</div>
		</>
	);
};

SearchBar.propTypes = {
	width: PropTypes.string,
	searchAction: PropTypes.func,
};

export default SearchBar;

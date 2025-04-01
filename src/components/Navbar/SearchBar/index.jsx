import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";
import { useQuestionStore, useNewsStore } from "../../../services";
import searchIcon from "../../../assets/images/SearchIcon.png";

const SearchBar = ({ width = "535px", isQuestionSearchBar = true }) => {
	const [searchValue, setSearchValue] = useState("");
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);

	const { getQuestions } = useQuestionStore();
	const { getNews } = useNewsStore();

	useEffect(() => {
		setOptions(isQuestionSearchBar ? getQuestions() : getNews());
	}, [isQuestionSearchBar]);

	const handleSearch = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			console.log(`Searched for: ${searchValue}`);
		}
	};

	const handleOptionSelect = (e, value) => {
		setSearchValue(value);
	};

	return (
		<>
			<div className="relative flex" style={{ width }}>
				<div className="relative w-full">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 z-50">
						<button onClick={handleSearch}>
							<img src={searchIcon} alt="SearchIcon" />
						</button>
					</div>
					<Autocomplete
						value={searchValue}
						onChange={handleOptionSelect}
						options={options.map((option) => option.title)}
						getOptionLabel={(option) => option}
						open={open}
						onOpen={() => setOpen(true)}
						onClose={() => setOpen(false)}
						renderOption={(props, option) => {
							const { key, ...otherProps } = props;
							return (
								<li
									key={key}
									{...otherProps}
									style={{
										fontFamily: "MorabbaRegular",
										fontSize: "1rem",
										padding: "1rem",
									}}
								>
									{option}
								</li>
							);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								className="relative m-0 block w-full rounded-md bg-white"
								placeholder=" جستجوی آیتم ها براساس عنواین و تگ ها ..."
								aria-label="Search"
								id="exampleFormControlInput2"
								dir="rtl"
								variant="outlined"
								sx={{
									"& .MuiOutlinedInput-root": {
										padding: "0.25rem",
										"& fieldset": {
											borderRadius: "0.375rem",
											borderColor: "#241c4a",
										},
									},
									"& .MuiInputBase-input": {
										fontFamily: "MorabbaRegular",
										fontSize: "1rem",
										lineHeight: 1.6,
										padding: "0.25rem 0.75rem",
										"&::placeholder": {
											color: "#241c4a",
										},
									},
								}}
								onKeyDown={handleSearch}
							/>
						)}
					/>
				</div>
			</div>
		</>
	);
};

SearchBar.propTypes = {
	width: PropTypes.string,
	options: PropTypes.array,
	isQuestionSearchBar: PropTypes.bool,
	key: PropTypes.string,
};

export default SearchBar;

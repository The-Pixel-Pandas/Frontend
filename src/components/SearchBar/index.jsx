import React from "react";
import PropTypes from "prop-types";
import searchIcon from "../../assets/images/SearchIcon.png";
import { Autocomplete, TextField } from "@mui/material";

const SearchBar = ({ width = "535px" }) => {
	const searchEvent = (e) => {
		e.preventDefault();
		console.log("Searched!");
	};

	return (
		<>
			<div className="relative flex" style={{ width }}>
				<div className="relative w-full">
					<div className="absolute inset-y-0 right-0 flex items-center pr-3 z-50">
						<button onClick={searchEvent}>
							<img src={searchIcon} alt="SearchIcon" />
						</button>
					</div>
					<Autocomplete
						options={[
							"سوال 1",
							"سوال 2",
							"سوال 3",
							"سوال 4",
							"سوال 5",
							"سوال 6",
							"سوال 7",
							"سوال 8",
							"سوال 9",
							"سوال 10",
							"سوال 11",
							"سوال 12",
							"سوال 13",
							"سوال 14",
							"سوال 15",
							"سوال 16",
							"سوال 17",
							"سوال 18",
							"سوال 19",
							"سوال 20",
						]}
						renderInput={(params) => (
							<TextField
								{...params}
								type="search"
								className="relative m-0 block w-full rounded-md bg-white bg-clip-padding"
								placeholder=" جستجوی سوال ها براساس عنواین و تگ ها ..."
								aria-label="Search"
								id="exampleFormControlInput2"
								dir="rtl"
								variant="outlined"
								sx={{
									'& .MuiOutlinedInput-root': {
										padding: '0.25rem',
										'& fieldset': {
											borderRadius: '0.375rem',
										},
									},
									'& .MuiInputBase-input': {
										fontFamily: 'MorabbaRegular',
										fontSize: '1rem',
										lineHeight: 1.6,
										padding: '0 0.75rem',
										'&::placeholder': {
											color: 'rgba(0, 0, 0, 0.4)',
										},
									},
								}}
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
};

export default SearchBar;

import React, { useEffect, useState } from "react";
import { QuestionGrid } from "../../components";
import { Skeleton } from "@mui/material";
import { httpService } from "../../services";

const Home = () => {
	// toggle state for see and manage loading skeleton 
	const [isLoading, setIsLoading] = useState(false);

	// const [questions, setQuestions] = useState([]);
	// useEffect(() => {
	// 	httpService
	// 		.get()
	// 		.then((res) => {
	// 			setQuestions(res.data);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	// TODO: Add coin to question list and manage coin to pass into card
	const questions = [
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
	];
	return (
		<>
			{isLoading ? (
				<div className="grid grid-cols-4 gap-4 ml-24 mr-24 mt-10">
					{[
						1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
						20,
					].map((i) => (
						<div className="mt-7" key={i}>
							<Skeleton
								variant="rect"
								sx={{
									bgcolor: "#171134",
									borderRadius: "16px",
									height: "170px",
									width: "300px",
								}}
							/>
						</div>
					))}
				</div>
			) : (
				// TODO: implement question card exactly as figma
				// if change grid positions or margins please fix skeleton to match as grid
				<QuestionGrid questions={questions} />
			)}
			{/* TODO: implement Footer and add it */}
		</>
	);
};

export default Home;

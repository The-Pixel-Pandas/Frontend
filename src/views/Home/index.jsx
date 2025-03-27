import React, { useEffect, useState } from "react";
import { QuestionGrid } from "../../components";
import { Skeleton } from "@mui/material";
import { httpService, useQuestionStore } from "../../services";

const Home = () => {
	// toggle state for see and manage loading skeleton
	const [isLoading, setIsLoading] = useState(false);
	const { setQuestions, getQuestions } = useQuestionStore();

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

	const questions = [
		{
			title: "سوال 1",
			coin: 100,
			description: "این یک سوال تست است",
		},
		{
			title: "سوال 2",
			coin: 200,
			description: "این سوال تست دوم است",
		},
		{
			title: "سوال 3",
			coin: 300,
			description: "این سوال تست سوم است",
		},
		{
			title: "سوال 4",
			coin: 400,
			description: "این سوال تست چهارم است",
		},
		{
			title: "سوال 5",
			coin: 500,
			description: "این سوال تست پنجم است",
		},
		{
			title: "سوال 6",
			coin: 600,
			description: "این سوال تست ششم است",
		},
		{
			title: "سوال 7",
			coin: 700,
			description: "این سوال تست هفتم است",
		},
		{
			title: "سوال 8",
			coin: 800,
			description: "این سوال تست هشتم است",
		},
		{
			title: "سوال 9",
			coin: 900,
			description: "این سوال تست نهم است",
		},
		{
			title: "سوال 10",
			coin: 1000,
			description: "این سوال تست دهم است",
		},
		{
			title: "سوال 11",
			coin: 1100,
			description: "این سوال تست یازدهم است",
		},
		{
			title: "سوال 12",
			coin: 1200,
			description: "این سوال تست دوازدهم است",
		},
		{
			title: "سوال 13",
			coin: 1300,
			description: "این سوال تست سیزدهم است",
		},
		{
			title: "سوال 14",
			coin: 1400,
			description: "این سوال تست چهاردهم است",
		},
		{
			title: "سوال 15",
			coin: 1500,
			description: "این سوال تست پانزدهم است",
		},
		{
			title: "سوال 16",
			coin: 1600,
			description: "این سوال تست شانزدهم است",
		},
		{
			title: "سوال 17",
			coin: 1700,
			description: "این سوال تست هفدهم است",
		},
		{
			title: "سوال 18",
			coin: 1800,
			description: "این سوال تست هجدهم است",
		},
		{
			title: "سوال 19",
			coin: 1900,
			description: "این سوال تست نوزدهم است",
		},
		{
			title: "سوال 20",
			coin: 2000,
			description: "این سوال تست بیستم است",
		},
	];

	useEffect(() => {
		setQuestions(questions);
	}, []);

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
				<QuestionGrid
					questions={getQuestions().map((q) => ({ ...q, coin: q.coin }))}
				/>
			)}
			{/* TODO: implement Footer and add it */}
		</>
	);
};

export default Home;

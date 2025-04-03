import React, { useEffect, useState } from "react";
import { QuestionGrid } from "../../components";
import { Skeleton } from "@mui/material";
import { httpService, useQuestionStore } from "../../services";
import { Footer, CategoryFilter, PostDetail } from "../../components";
import { useParams } from "react-router-dom";

const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { setQuestions, getQuestions } = useQuestionStore();
	const [questionData, setQuestionData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const { questionId } = useParams();

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await httpService.get(
					"https://mocki.io/v1/d12f1197-9bf8-44ab-8c3e-0a75746475cd"
				);
				setQuestions(response.current_node.data);
				setIsLoading(false);
			} catch (err) {
				console.error("Failed to fetch questions:", err);
				setError("خطا در ارتباط با سرور لطفا مجددا تلاش کنید");
				setIsLoading(false);
			}
		};

		fetchQuestions();
	}, [setQuestions]);

	useEffect(() => {
		if (questionId) {
			const fetchQuestionDetails = async () => {
				try {
					const [questionResponse, commentsResponse] = await Promise.all([
						httpService.get(
							`https://mocki.io/v1/cdeeecd7-f616-4a06-9da2-a9cc3f5e539d`
						),
						httpService.get(
							`https://mocki.io/v1/6ed43c72-ef71-4b5e-8c43-41514698ff21`
						),
					]);
					setQuestionData(questionResponse.data);
					setUsersData(commentsResponse);
				} catch (err) {
					console.error("Failed to fetch question details:", err);
					setError("خطا در ارتباط با سرور لطفا مجددا تلاش کنید");
				}
			};

			fetchQuestionDetails();
		}
	}, [questionId]);

	let currentQuestions = getQuestions();

	if (error) {
		return <div className="text-center text-red-600 mt-4">{error}</div>;
	}

	if (questionId && questionData) {
		return (
			<PostDetail
				postData={questionData}
				usersData={usersData}
				isExchange={true}
			/>
		);
	}

	// TODO:for test comment it after full implementation question grid and card
	currentQuestions = [
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

	return (
		<>
			<>
				<CategoryFilter />
				<div className="flex mt-0 justify-center mb-10 pb-24">
					{isLoading ? (
						<div className="grid grid-cols-4 gap-4 ml-24 mr-24 ">
							{[
								1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
								19, 20,
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
						// TODO: implement show more button to if click more question showed
						// if change grid positions or margins please fix skeleton to match as grid
						<QuestionGrid questions={currentQuestions} />
					)}
				</div>

				<div className="mt-20">
					<Footer isPageFooter={true} />
				</div>
			</>
		</>
	);
};

export default Home;

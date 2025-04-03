import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryFilter, QuestionGrid, Footer } from "../../components";
import { PostDetail } from "../../components";
import { httpService, useQuestionStore } from "../../services";
import { Skeleton } from "@mui/material";

const News = () => {
	const { questionId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [questionData, setQuestionData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const { getQuestions, setQuestions } = useQuestionStore();
	const currentQuestions = getQuestions();

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

	return (
		<>
			<>
				<CategoryFilter />
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
					<QuestionGrid questions={currentQuestions} />
				)}

				<div className="mt-20">
					<Footer isPageFooter={true} />
				</div>
			</>
		</>
	);
};

export default News;

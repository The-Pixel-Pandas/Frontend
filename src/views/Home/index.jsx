import React, { useEffect, useState } from "react";
import { QuestionGrid } from "../../components";
import { Skeleton, Pagination } from "@mui/material";
import { httpService } from "../../services";
import { useFetchData } from "../../hooks";
import { Footer, CategoryFilter, PostDetail, Toast } from "../../components";
import { useParams } from "react-router-dom";

const Home = () => {
	const { fetchData, data, isLoading, error } = useFetchData();
	const [questionData, setQuestionData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const { questionId } = useParams();

	const handleChangePage = (event, page) => {
		setPageNumber(page);
		handleQuestionAPI(
			`https://mocki.io/v1/c0b30442-ef1f-4a6c-9743-28663d7353d9?_page=${page}`
		);
		event.preventDefault();
	};

	const handleQuestionAPI = async (url) => {
		try {
			const response = await fetchData(url);
			console.log("Fetched data:", response);
		} catch (error) {
			console.error("Error fetching initial data:", error);
		}
	};

	useEffect(() => {
		handleQuestionAPI(
			"https://mocki.io/v1/c0b30442-ef1f-4a6c-9743-28663d7353d9"
		);
	}, []);

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
				}
			};

			fetchQuestionDetails();
		}
	}, [questionId]);

	if (error) {
		return <Toast type="error" message={error} position="bottom-left" />;
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
						<QuestionGrid questions={data.current_node.data} />
					)}
				</div>

				<div>
					<div className="flex justify-center mb-48">
						<Pagination
							boundaryCount={1}
							page={pageNumber}
							onChange={handleChangePage}
							shape="rounded"
							siblingCount={1}
							count={2}
							color="primary"
							size="large"
							variant="text"
							sx={{
								"& .MuiPaginationItem-root": {
									color: "#fff",
									"&.Mui-selected": {
										color: "#fff",
										borderColor: "#fff",
									},
								},
							}}
						/>
					</div>
					<div>
						<Footer isPageFooter={true} />
					</div>
				</div>
			</>
		</>
	);
};

export default Home;

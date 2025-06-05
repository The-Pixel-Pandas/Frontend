import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { httpService } from "../../services";
import { useFetchData } from "../../hooks";
import {
	Footer,
	CategoryFilter,
	PostDetail,
	Toast,
	HomeSkeleton,
	SearchBar,
	CardGrid,
} from "../../components";
import { useParams } from "react-router-dom";

const Home = () => {
	const { fetchData, data, isLoading, error } = useFetchData();
	const [questionData, setQuestionData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const { questionId } = useParams();
	const [activeCategory, setActiveCategory] = useState("همه موارد");
	const [totalPages, setTotalPages] = useState(0);

	const handleSearch = (searchText) => {
		console.log("Searched!", searchText);
		handleQuestionAPI(
			`questions/?page=${pageNumber}&page_size=20&search=${searchText}`
		);
	};

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		console.log(
			`questions/?page=${pageNumber}&page_size=20&${category == "همه موارد" ? "" : `type=${category}`}`
		);
		handleQuestionAPI(
			`questions/?page=${pageNumber}&page_size=20&${category == "همه موارد" ? "" : `type=${category}`}`
		);
	};

	const handleChangePage = (event, page) => {
		setPageNumber(page);
		handleQuestionAPI(
			`questions/?page=${page}&page_size=20&${activeCategory == "همه موارد" ? "" : `type=${activeCategory}`}`
		);
		event.preventDefault();
	};

	const handleQuestionAPI = async (url) => {
		try {
			const response = await fetchData(url);
			console.log("Fetched data:", response);
			setTotalPages(Math.ceil(response.count / 20));
		} catch (error) {
			console.error("Error fetching initial data:", error);
		}
	};

	useEffect(() => {
		handleQuestionAPI(`questions/?page=${pageNumber}&page_size=20`);
	}, []);

	useEffect(() => {
		if (questionId) {
			const fetchQuestionDetails = async () => {
				try {
					const [questionResponse, commentsResponse] = await Promise.all([
						httpService.get(`questions/${questionId}`),
						httpService.get(
							`https://mocki.io/v1/f6213b73-ebbe-4a15-8fcf-e4aff241b2f7`
						),
					]);
					setQuestionData(questionResponse);
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
			{/* SearchBar */}
			<div className="absolute top-0 left-0 ml-80 mt-8">
				<SearchBar width="535px" searchAction={handleSearch} />
			</div>
			{/* CategoryFilter */}
			<CategoryFilter onSelect={handleCategoryClick} />
			{/* Questions Layout */}
			<div className="flex mt-0 justify-center mb-10 pb-24">
				{isLoading ? <HomeSkeleton /> : <CardGrid items={data.results} />}
			</div>
			{/* Pagination */}
			<div>
				<div className="flex justify-center mb-10">
					<Pagination
						boundaryCount={1}
						page={pageNumber}
						onChange={handleChangePage}
						shape="rounded"
						siblingCount={1}
						count={totalPages}
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
				{/* Footer */}
				<div>
					<Footer isPageFooter={true} />
				</div>
			</div>
		</>
	);
};

export default Home;

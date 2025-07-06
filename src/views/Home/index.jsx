import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { httpService, useCoinStore } from "../../services";
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
import { Checkbox } from "@mui/material";
import { useParams } from "react-router-dom";

const Home = () => {
	const { fetchData, data, isLoading, error } = useFetchData();
	const [questionData, setQuestionData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const { questionId } = useParams();
	const [activeCategory, setActiveCategory] = useState("همه موارد");
	const [totalPages, setTotalPages] = useState(0);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [count, setCount] = useState(0);
	const [checked, setChecked] = useState(false);
	const { setCoin, coin } = useCoinStore();

	const handleCheckboxChange = (event) => {
		const isChecked = event.target.checked;
		setChecked(isChecked);
		if (isChecked) {
			handleQuestionAPI(
				`questions/?${activeCategory == "همه موارد" ? "" : `type=${activeCategory}`}&is_active=true`
			);
		} else {
			handleQuestionAPI(
				`questions/?${activeCategory == "همه موارد" ? "" : `type=${activeCategory}`}`
			);
		}
	};

	const handleSearch = (searchText) => {
		handleQuestionAPI(
			`questions/?search=${searchText}${checked ? "&is_active=true" : ""}`
		);
	};

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		handleQuestionAPI(
			`questions/?${category == "همه موارد" ? "" : `type=${category}`}${checked ? "&is_active=true" : ""}`
		);
	};

	const handleChangePage = (event, page) => {
		setPageNumber(page);
		handleQuestionAPI(
			`questions/?page=${page}&${activeCategory == "همه موارد" ? "" : `type=${activeCategory}`}${checked ? "&is_active=true" : ""}`
		);
		event.preventDefault();
	};

	const handleQuestionAPI = async (url, isInitial = true) => {
		try {
			if (isInitial) setIsFirstLoad(true);
			const response = await fetchData(url);
			console.log("Fetched data:", response);
			setTotalPages(response?.total_pages || 0);
			setCount(response?.count || 0);
			if (isInitial) setIsFirstLoad(false);
		} catch (error) {
			console.error("Error fetching initial data:", error);
		}
	};

	const fetchQuestionDetails = async () => {
		try {
			const [questionResponse, commentsResponse] = await Promise.all([
				httpService.get(`questions/${questionId}`),
				httpService.get(`questions/${questionId}/comments/`),
			]);
			setQuestionData(questionResponse);
			setUsersData(commentsResponse);
			console.log("Question details:", questionResponse);
			console.log("Comments details:", commentsResponse);
		} catch (err) {
			console.error("Failed to fetch question details:", err);
		}
	};

	useEffect(() => {
		handleQuestionAPI(
			`questions/?page=${pageNumber}${checked ? "&is_active=true" : ""}`
		);
	}, []);

	useEffect(() => {
		if (!questionId) return;
		fetchQuestionDetails();
		const interval = setInterval(() => {
			fetchQuestionDetails();
		}, 5000);

		return () => clearInterval(interval);
	}, [questionId]);

	useEffect(() => {
		const interval = setInterval(() => {
			httpService.get("wallet/").then((res) => {
				if (res.total_balance != coin) {
					setCoin(res.total_balance);
				}
			});
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (questionId) fetchQuestionDetails();
	}, [questionId]);

	if (error) {
		return <Toast type="error" message={error} position="bottom-left" />;
	}

	return (
		<>
			{questionId && questionData ? (
				<PostDetail
					postData={questionData}
					usersData={usersData}
					isExchange={true}
				/>
			) : (
				<div>
					{/* SearchBar */}
					<div className="absolute top-0 left-0 ml-80 mt-8">
						<SearchBar width="535px" searchAction={handleSearch} />
					</div>
					{/* CategoryFilter */}
					<CategoryFilter onSelect={handleCategoryClick} />
					<div
						className="absolute top-0 left-36 mr-24 mt-28 flex items-center gap-2 flex-row"
						dir="rtl"
					>
						<Checkbox
							defaultChecked={false}
							sx={{
								"&.MuiCheckbox-root": {
									color: "#1F9BFF",
								},
							}}
							onChange={handleCheckboxChange}
						/>
						<div className="text-[15px] font-MorabbaMedium text-white">
							فقط پرسش های فعال
						</div>
					</div>
					{/* Questions Layout */}
					<div className="flex mt-0 justify-center mb-10 pb-24">
						{isFirstLoad && isLoading ? (
							<HomeSkeleton />
						) : (
							<CardGrid items={data.results} />
						)}
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
								count={totalPages == 1 ? 0 : totalPages}
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
									"& .MuiPaginationItem-previousNext": {
										display: totalPages > 1 ? "flex" : "none",
									},
								}}
							/>
						</div>
						{count == 0 && (
							<div className="flex justify-center">
								<span className="text-4xl font-MorabbaBold text-transparent bg-clip-text bg-gradient-to-r from-[#013cff] to-[#01ddff] animate-pulse duration-1000 ease-in-out transition-all transform-gpu scale-150 hover:scale-125">
									دیتایی یافت نشد
								</span>
							</div>
						)}
						{/* Footer */}
						<div className={`${count <= 4 ? "absolute bottom-0" : ""}`}>
							<Footer isPageFooter={true} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;

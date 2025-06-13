import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks";
import { httpService } from "../../services";
import {
	Footer,
	CategoryFilter,
	PostDetail,
	Toast,
	HomeSkeleton,
	SearchBar,
	CardGrid,
} from "../../components";

const News = () => {
	const { fetchData, data, isLoading, error } = useFetchData();
	const [NewsData, setNewsData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const { newsId } = useParams();
	const [activeCategory, setActiveCategory] = useState("همه موارد");
	const [totalPages, setTotalPages] = useState(0);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [count, setCount] = useState(0);

	const handleSearch = (searchText) => {
		handleNewsAPI(`news/?search=${searchText}`);
	};

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		handleNewsAPI(`news/?${category == "همه موارد" ? "" : `type=${category}`}`);
	};

	const handleChangePage = (event, page) => {
		setPageNumber(page);
		handleNewsAPI(
			`news/?page=${page}&${activeCategory == "همه موارد" ? "" : `type=${activeCategory}`}`
		);
		event.preventDefault();
	};

	const handleNewsAPI = async (url, isInitial = true) => {
		try {
			if (isInitial) setIsFirstLoad(true);
			const response = await fetchData(url);
			console.log("Fetched data:", response);
			setTotalPages(response?.total_pages || Math.ceil(response?.count / 20));
			setCount(response?.count || 0);
			if (isInitial) setIsFirstLoad(false);
		} catch (error) {
			console.error("Error fetching initial data:", error);
		}
	};

	const fetchNewsDetails = async () => {
		try {
			const [NewsResponse, commentsResponse] = await Promise.all([
				httpService.get(`news/${newsId}`),
				httpService.get(`news/${newsId}/comments/`),
			]);
			setNewsData(NewsResponse);
			setUsersData(commentsResponse);
		} catch (err) {
			console.error("Failed to fetch News details:", err);
		}
	};

	useEffect(() => {
		if (!newsId) return;
		fetchNewsDetails();
		const interval = setInterval(() => {
			fetchNewsDetails();
		}, 5000);

		return () => clearInterval(interval);
	}, [newsId]);

	useEffect(() => {
		if (newsId) fetchNewsDetails();
	}, [newsId]);

	useEffect(() => {
		handleNewsAPI(`news/?page=${pageNumber}`);
	}, []);

	if (error) {
		return <Toast type="error" message={error} position="bottom-left" />;
	}

	return (
		<>
			{newsId && NewsData ? (
				<PostDetail
					postData={NewsData}
					usersData={usersData}
					isExchange={false}
				/>
			) : (
				<div>
					{/* SearchBar */}
					<div className="absolute top-0 left-0 ml-80 mt-8">
						<SearchBar width="535px" searchAction={handleSearch} />
					</div>
					{/* CategoryFilter */}
					<CategoryFilter onSelect={handleCategoryClick} />
					{/* News Layout */}
					<div className="flex mt-0 justify-center mb-10 pb-24">
						{isLoading && isFirstLoad ? (
							<HomeSkeleton />
						) : (
							<CardGrid items={data.results} isExchange={false} />
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

export default News;

import { useState, useEffect } from "react";
import { httpService } from "../../services";
import useFetchData from "../useFetchData";

const useContentView = (baseUrl, detailsUrl, commentsUrl) => {
	const { fetchData, data, isLoading, error } = useFetchData();
	const [initialLoad, setInitialLoad] = useState(true);
	const [contentData, setContentData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [activeCategory, setActiveCategory] = useState("همه موارد");
	const [totalPages, setTotalPages] = useState(0);

	const handleSearch = (searchText) => {
		handleContentAPI(
			`${baseUrl}?_page=${pageNumber}&_category=${activeCategory}&_search=${searchText}`
		);
	};

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		handleContentAPI(`${baseUrl}?_page=${pageNumber}&_category=${category}`);
	};

	const handleChangePage = (event, page) => {
		setPageNumber(page);
		handleContentAPI(`${baseUrl}?_page=${page}&_category=${activeCategory}`);
		event.preventDefault();
	};

	const handleContentAPI = async (url) => {
		try {
			const response = await fetchData(url);
			setInitialLoad(false);
			setTotalPages(response.current_node.total_pages);
		} catch (error) {
			console.error("Error fetching data:", error);
			setInitialLoad(false);
		}
	};

	const fetchDetails = async (id) => {
		try {
			// const [contentResponse, commentsResponse] = await Promise.all([
			// 	httpService.get(`${detailsUrl}/${id}`),
			// 	httpService.get(`${commentsUrl}/${id}`),
			// ]);
			console.log("id of details:", id);
			const [contentResponse, commentsResponse] = await Promise.all([
				httpService.get(`${detailsUrl}`),
				httpService.get(`${commentsUrl}`),
			]);
			console.log("contentResponse:", contentResponse);
			console.log("commentsResponse:", commentsResponse);
			setContentData(contentResponse.data);
			setUsersData(commentsResponse);
		} catch (err) {
			console.error("Failed to fetch details:", err);
		}
	};

	useEffect(() => {
		handleContentAPI(baseUrl);
	}, []);

	return {
		data,
		isLoading,
		error,
		initialLoad,
		contentData,
		usersData,
		pageNumber,
		activeCategory,
		totalPages,
		handleSearch,
		handleCategoryClick,
		handleChangePage,
		fetchDetails,
	};
};

export default useContentView;

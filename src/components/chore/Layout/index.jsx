import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../navbar/Navbar";
import { useAuthStore } from "../../../services";

const Layout = ({
	children,
	hasSearchBarItem = false,
	isQuestionSearchBar = true,
}) => {
	const { isAuthenticated } = useAuthStore();

	return (
		<>
			<Navbar
				hasSearchBarItem={hasSearchBarItem}
				isAuthenticated={isAuthenticated}
				isQuestionSearchBar={isQuestionSearchBar}
			/>
			{children}
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	hasSearchBarItem: PropTypes.bool,
	isQuestionSearchBar: PropTypes.bool,
};

export default Layout;

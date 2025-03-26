import React from "react";
import PropTypes from "prop-types";
import Navbar from "../Navbar";
import { useAuthStore } from "../../services";

const Layout = ({ children, isLandingPage = false }) => {
	const { isAuthenticated } = useAuthStore();

	return (
		<>
			<Navbar isLandingPage={isLandingPage} isAuthenticated={isAuthenticated} />
			{children}
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	isLandingPage: PropTypes.bool,
};

export default Layout;

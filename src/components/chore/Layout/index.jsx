import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../navbar/Navbar";
import { useAuthStore } from "../../../services";

const Layout = ({ children }) => {
	const { isAuthenticated } = useAuthStore();

	return (
		<>
			<Navbar isAuthenticated={isAuthenticated} />
			{children}
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;

import React from "react";
import PropTypes from "prop-types";
import "./preloader.css";

const PreLoader = ({ load }) => {
	React.useEffect(() => {
		if (load) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [load]);

	const loadingStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 999999,
		background: "linear-gradient(135deg, #0c0513 0%, #1a1040 100%)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		transition: "opacity 0.5s ease-in-out",
	};

	const noneStyle = {
		...loadingStyle,
		opacity: 0,
		pointerEvents: "none",
		visibility: "hidden",
	};

	return (
		<div style={load ? loadingStyle : noneStyle}>
			<div className="loader-container">
				<div className="loader">
					<div className="loader-inner"></div>
					<div className="loader-outer"></div>
				</div>
				<div className="loading-text">
					{" "}
					سایت در حال بارگذاری است...<span className="dots">...</span>
				</div>
			</div>
		</div>
	);
};

PreLoader.propTypes = {
	load: PropTypes.bool,
};

PreLoader.defaultProps = {
	load: true,
};

export default PreLoader;

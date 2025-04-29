import React, { useState, useEffect } from "react";
import { PreLoader } from "../../components/chore";

const Preloader = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return <PreLoader load={loading} />;
};

export default Preloader;

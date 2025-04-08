import React from "react";
import { Skeleton } from "@mui/material";

const HomeSkeleton = () => {
	return (
		<div className="grid grid-cols-4 gap-4 ml-24 mr-24 ">
			{[
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
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
	);
};

export default HomeSkeleton;

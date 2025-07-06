import React from "react";
import { Skeleton } from "@mui/material";

const ForecastResultSkeleton = () => {
	return (
		<div className="flex flex-col gap-4  ">
			{[1, 2, 3].map((i) => (
				<div className="mt-7" key={i}>
					<Skeleton
						variant="rect"
						sx={{
							bgcolor: "#171134",
							borderRadius: "25px",
							height: "220px",
							width: "400px",
						}}
					/>
				</div>
			))}
		</div>
	);
};

export default ForecastResultSkeleton;

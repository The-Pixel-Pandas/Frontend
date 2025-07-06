import React from "react";
import { Skeleton } from "@mui/material";

const TaskSkeleton = () => {
	return (
		<div className="flex flex-col gap-4  ">
			{[1, 2, 3].map((i) => (
				<div className="mt-7" key={i}>
					<Skeleton
						variant="rect"
						sx={{
							bgcolor: "#1E1531",
							borderRadius: "16px",
							height: "160px",
							width: "400px",
						}}
					/>
				</div>
			))}
		</div>
	);
};

export default TaskSkeleton;

import { Box, Stack, Typography } from "@mui/material";
import { JobPosting, jobTypeMap } from "../types/job-type";
import { jobFieldMap } from "../types/job-field-type";

interface SingleJobPostingProps {
	jobPosting: JobPosting;
	onClick: () => void;
}

export const SingleJobPosting: React.FC<SingleJobPostingProps> = ({
	jobPosting,
	onClick,
}) => {
	return (
		<Box
			sx={{
				borderRadius: "16px",
				border: "1px solid #38444D",
				padding: "16px",
				cursor: "pointer",
				transition: "background-color 0.2s ease",
				"&:hover": { backgroundColor: "#252F36" },
			}}
			onClick={onClick}
		>
			<Stack spacing={0.5}>
				<Typography
					variant="body1"
					sx={{
						color: "text.primary",
						fontWeight: "bold",
					}}
				>
					{jobPosting.title}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						color: "text.secondary",
						fontSize: "14px",
					}}
				>
					{jobFieldMap[jobPosting.field]}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						color: "text.disabled",
						fontSize: "14px",
						letterSpacing: "0.5px",
					}}
				>
					{jobTypeMap[jobPosting.jobType]}
				</Typography>
			</Stack>
		</Box>
	);
};

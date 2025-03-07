import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import {
	animate,
	AnimatePresence,
	motion,
	useMotionValue,
	useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { useGetJobPostings } from "../hooks/queries/useGetJobPostings";
import { JobPosting, jobTypeMap } from "../types/job-type";
import { CompanyPostingDetails } from "./CompanyPostingDetails";

export const CompanyPostings = () => {
	const count = useMotionValue(0);
	const rounded = useTransform(() => Math.round(count.get()));
	const [page, setPage] = useState(1);
	const pageSize = 3;
	const {
		companyJobPostings: { data },
	} = useGetJobPostings(page, pageSize);
	const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

	const jobPostings = data?.data;
	const total = data?.total;

	const onBack = (page: number) => {
		setSelectedJob(null);
		setPage(page);
	};

	useEffect(() => {
		const controls = animate(count, total ?? 0, { duration: 1 });
		return () => controls.stop();
	}, [count, total]);

	return (
		<Container maxWidth="lg" sx={{ marginTop: "4rem", position: "relative" }}>
			<AnimatePresence>
				{selectedJob ? (
					<CompanyPostingDetails
						key={selectedJob.id}
						jobPosting={selectedJob}
						onBack={onBack}
						page={page}
					/>
				) : (
					<>
						<Typography variant="h2" textAlign="center" color="textDisabled">
							Job Postings:
							<motion.pre style={{ fontSize: 30, color: "#4ff0b7" }}>
								{rounded}
							</motion.pre>
						</Typography>
						<Stack my={2} gap={2}>
							{jobPostings?.map((jobPosting) => (
								<Box
									key={jobPosting.id}
									sx={{
										borderRadius: "16px",
										border: "1px solid #38444D",
										padding: "16px",
										cursor: "pointer",
										transition: "background-color 0.2s ease",
										"&:hover": { backgroundColor: "#252F36" },
									}}
									onClick={() => setSelectedJob(jobPosting)}
								>
									<Stack flexDirection="row" justifyContent="space-between">
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
												{jobPosting.field}
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
										<Stack>test</Stack>
									</Stack>
								</Box>
							))}
						</Stack>
						<Pagination
							count={data?.totalPages || 0}
							onChange={(_, newPage) => setPage(newPage)}
							variant="outlined"
							shape="rounded"
							page={page}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						/>
					</>
				)}
			</AnimatePresence>
		</Container>
	);
};

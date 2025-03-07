import {
	Container,
	Pagination,
	Skeleton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useGetJobPostings } from "../hooks/queries/useGetJobPostings";
import { JobPosting } from "../types/job-type";
import { JobPostingDrawer } from "./JobPostingDrawer";
import { SingleJobPosting } from "./SingleJobPosting";

export const JobPostings = () => {
	const [page, setPage] = useState(1);
	const pageSize = 2;
	const [filters, setFilters] = useState({
		field: "",
		salaryMin: 0,
		salaryMax: 0,
	});
	const [selectedJobPosting, setSelectedJobPosting] =
		useState<JobPosting | null>(null);
	const {
		allJobPostings: { data, isLoading, refetch },
	} = useGetJobPostings(page, pageSize, filters);

	const jobPostings = data?.data || [];

	const selectJobPosting = (id: string) => {
		const job = findSelectedJob(id);
		if (job) {
			setSelectedJobPosting(job);
		}
	};

	const findSelectedJob = (id: string) => {
		return data?.data?.find((job) => job.id === id);
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: name === "field" ? value : Number(value),
		}));
	};

	const debouncedRefetch = useCallback(
		debounce(() => {
			refetch();
		}, 500),
		[refetch]
	);

	useEffect(() => {
		debouncedRefetch();
	}, [filters, debouncedRefetch]);

	return (
		<Container maxWidth="lg">
			<Typography
				variant="h2"
				textAlign="center"
				color="textDisabled"
				sx={{ marginTop: "4rem" }}
			>
				Jobs
			</Typography>
			<Stack
				justifyContent="center"
				alignItems="center"
				direction={{ xs: "column", md: "row" }}
				gap={2}
			>
				<Typography flex={1} variant="h5">
					Filters
				</Typography>
				<TextField name="field" fullWidth onChange={handleFilterChange} />
				<TextField
					name="salaryMin"
					type="number"
					fullWidth
					onChange={handleFilterChange}
				/>
				<TextField
					name="salaryMax"
					type="number"
					fullWidth
					onChange={handleFilterChange}
				/>
			</Stack>
			<Stack gap={1} my={1}>
				{isLoading ? (
					<Skeleton animation="wave" />
				) : (
					jobPostings &&
					jobPostings.length &&
					jobPostings.map((jobPosting) => (
						<SingleJobPosting
							key={jobPosting.id}
							jobPosting={jobPosting}
							onClick={() => selectJobPosting(jobPosting.id)}
						/>
					))
				)}
			</Stack>
			<Pagination
				count={data?.totalPages || 0}
				onChange={(_, newPage) => setPage(newPage)}
				variant="outlined"
				shape="rounded"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			/>

			{selectedJobPosting && (
				<JobPostingDrawer
					onClose={() => setSelectedJobPosting(null)}
					open={!!selectedJobPosting}
					jobPosting={selectedJobPosting}
					onAbort={() => setSelectedJobPosting(null)}
				/>
			)}
		</Container>
	);
};

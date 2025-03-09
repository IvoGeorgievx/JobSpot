import {
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Pagination,
	Select,
	Skeleton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useGetJobPostings } from "../hooks/queries/useGetJobPostings";
import { JobField, jobFieldMap } from "../types/job-field-type";
import { JobPosting } from "../types/job-type";
import { JobPostingDrawer } from "./JobPostingDrawer";
import { SingleJobPosting } from "./SingleJobPosting";

import { SelectChangeEvent } from "@mui/material";

export const JobPostings = () => {
	const [page, setPage] = useState(1);
	const pageSize = 3;
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

	const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[e.target.name]: e.target.value,
		}));
	};

	const handleFieldChange = (e: SelectChangeEvent<string>) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			field: e.target.value,
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
				my={2}
				gap={2}
			>
				<Typography flex={1} variant="h5">
					Filters
				</Typography>
				<FormControl fullWidth>
					<InputLabel id="job-field">Job Field</InputLabel>
					<Select
						labelId="job-field"
						id="job-field"
						label="Job Field"
						value={filters.field}
						onChange={handleFieldChange}
					>
						<MenuItem value={""}>All</MenuItem>
						{Object.values(JobField).map((field) => (
							<MenuItem key={field} value={field}>
								{jobFieldMap[field]}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					name="salaryMin"
					type="number"
					label="Minimum Salary"
					fullWidth
					onChange={handleSalaryChange}
				/>
				<TextField
					name="salaryMax"
					type="number"
					label="Maximum Salary"
					fullWidth
					onChange={handleSalaryChange}
				/>
			</Stack>
			<Stack gap={1} my={1} minHeight="430px">
				{isLoading ? (
					<>
						<Skeleton animation="wave" height="105px" />
						<Skeleton animation="wave" height="105px" />
						<Skeleton animation="wave" height="105px" />
					</>
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

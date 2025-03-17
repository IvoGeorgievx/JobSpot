import {
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetJobApplicants } from "../../hooks/queries/useGetJobApplicants";
import { useGetJobPostings } from "../../hooks/queries/useGetJobPostings";
import { FilterPeriod } from "../../types/filter-period-type";
import { ApplicationStatus } from "../../types/job-application-type";
import CompanyJobChart from "../Charts/CompanyJobChart";
import DashboardCard from "../DashboardCard";
import MotionNumbers from "../Theme/MotionNumbers";

const CompanyHome = () => {
	const [period, setPeriod] = useState<FilterPeriod>("all");
	const {
		companyJobPostings: { data, isLoading },
	} = useGetJobPostings(1, 99, {}, period);

	const companyJobPostingIds =
		data?.data.map((jobPosting) => jobPosting.id) ?? [];

	const { data: jobData } = useGetJobApplicants(companyJobPostingIds);

	const handleSelectChange = (event: SelectChangeEvent) => {
		setPeriod(event.target.value as FilterPeriod);
	};

	const jobApplications = jobData?.jobApplications ?? [];
	const jobApplicants = jobData?.applicants ?? [];

	const reviewedApplications = jobApplications.filter(
		(jobApplication) => jobApplication.status === ApplicationStatus.REVIEWED
	);
	return (
		<>
			<Paper square sx={{ padding: 4, minHeight: "250px" }}>
				<Container maxWidth="xl">
					<Stack
						gap={4}
						direction={{ s: "column", md: "row" }}
						justifyContent="center"
						alignItems="center"
					>
						<DashboardCard
							title="Total Jobs Posted"
							background="linear-gradient(to bottom, #000000, #1E2528)"
							value={
								data?.data ? <MotionNumbers value={data.data.length} /> : 0
							}
						/>
						<DashboardCard
							title="Total Applicants"
							background="linear-gradient(to bottom, #000000, #2C3A47)"
							value={
								jobApplicants.length ? (
									<MotionNumbers value={jobApplicants.length} />
								) : (
									0
								)
							}
						/>
						<DashboardCard
							title="Reviewed Applications"
							background="linear-gradient(to bottom, #000000, #38444D)"
							value={
								jobApplications.length ? (
									<MotionNumbers value={reviewedApplications.length} />
								) : (
									0
								)
							}
						/>
					</Stack>
				</Container>
			</Paper>
			<Paper
				square
				elevation={2}
				sx={{
					padding: 2,
					height: "400px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					pt: 4,
				}}
			>
				{isLoading ? (
					<Skeleton variant="rounded" width={600} height={260} />
				) : jobApplications.length === 0 ||
				  !data?.data ||
				  data.data.length === 0 ? (
					<Typography variant="body1" textAlign="center">
						No data available
					</Typography>
				) : (
					<Stack
						width="100%"
						height="100%"
						justifyContent="center"
						alignItems="center"
						direction={{ xs: "column-reverse", md: "row" }}
					>
						<CompanyJobChart
							jobPostings={data.data}
							jobApplications={jobApplications}
						/>
						<FormControl
							sx={{
								alignSelf: { xs: "center", md: "self-start" },
								mr: 2,
								mb: 2,
								minWidth: { xs: "50%", md: "100px" },
							}}
						>
							<InputLabel id="period">Period</InputLabel>
							<Select
								labelId="period"
								id="period"
								value={period}
								label="Period"
								onChange={handleSelectChange}
							>
								<MenuItem value="all">All</MenuItem>
								<MenuItem value="weekly">Weekly</MenuItem>
								<MenuItem value="monthly">Monthly</MenuItem>
								<MenuItem value="yearly">Yearly</MenuItem>
							</Select>
						</FormControl>
					</Stack>
				)}
			</Paper>
		</>
	);
};

export default CompanyHome;

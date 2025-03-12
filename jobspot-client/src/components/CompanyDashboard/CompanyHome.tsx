import { Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetJobApplicants } from "../../hooks/queries/useGetJobApplicants";
import { useGetJobPostings } from "../../hooks/queries/useGetJobPostings";
import { Applicant } from "../../types/applicant-type";
import { JobApplication } from "../../types/job-application-type";
import CompanyJobChart from "../Charts/CompanyJobChart";
import CompanyDashboardCard from "./CompanyDashboardCard";
import MotionNumbers from "../Theme/MotionNumbers";

const CompanyHome = () => {
	const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
	const [jobApplicants, setJobApplicants] = useState<Applicant[]>([]);
	const {
		companyJobPostings: { data },
	} = useGetJobPostings(1, 99);

	const companyJobPostingIds =
		data?.data.map((jobPosting) => jobPosting.id) ?? [];

	const { data: jobData } = useGetJobApplicants(companyJobPostingIds);

	useEffect(() => {
		if (jobData) {
			setJobApplications(jobData.jobApplications);
			setJobApplicants(jobData.applicants);
		}
	}, [jobData]);

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
						<CompanyDashboardCard
							title="Total Jobs Posted"
							background="linear-gradient(to bottom, #000000, #1E2528)"
							value={
								data?.data ? <MotionNumbers value={data.data.length} /> : 0
							}
						/>
						<CompanyDashboardCard
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
						<CompanyDashboardCard
							background="linear-gradient(to bottom, #000000, #38444D)"
							value={5}
							title="test t"
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
				{jobApplications.length === 0 ||
				!data?.data ||
				data.data.length === 0 ? (
					<Typography variant="body1" textAlign="center">
						No data available
					</Typography>
				) : (
					<CompanyJobChart
						jobPostings={data.data}
						jobApplications={jobApplications}
					/>
				)}
			</Paper>
		</>
	);
};

export default CompanyHome;

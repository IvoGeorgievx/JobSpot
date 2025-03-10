import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetJobApplicants } from "../hooks/queries/useGetJobApplicants";
import { useGetJobPostings } from "../hooks/queries/useGetJobPostings";
import { Applicant } from "../types/applicant-type";
import { JobApplication } from "../types/job-application-type";
import CompanyJobChart from "./Charts/CompanyJobChart";

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
		<Paper sx={{ padding: 2, height: "400px" }}>
			<Typography variant="h4" textAlign="center">
				Your Job Applications
			</Typography>
			{jobApplications.length === 0 || !data?.data || data.data.length === 0 ? (
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
	);
};

export default CompanyHome;

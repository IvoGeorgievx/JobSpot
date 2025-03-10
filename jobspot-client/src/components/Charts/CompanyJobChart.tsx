import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { JobApplication } from "../../types/job-application-type";
import { JobPosting } from "../../types/job-type";

interface CompanyJobChartProps {
	jobPostings: JobPosting[];
	jobApplications: JobApplication[];
}

const CompanyJobChart: React.FC<CompanyJobChartProps> = ({
	jobApplications,
	jobPostings,
}) => {
	const chartData = useMemo(() => {
		if (!jobPostings) return [];

		return jobPostings.map((jobPosting) => {
			const matchApplication = jobApplications.filter(
				(jobApplication) => jobApplication.jobPostingId === jobPosting.id
			);

			return {
				title: jobPosting.title,
				applicants: matchApplication.length,
			};
		});
	}, [jobPostings, jobApplications]);
	return (
		<ResponsiveContainer width="50%" height="100%">
			<BarChart data={chartData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="title" />
				<YAxis />
				{/* <Tooltip /> */}
				<Legend />
				<Bar dataKey="applicants" fill="#8884d8" barSize={100} />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default CompanyJobChart;

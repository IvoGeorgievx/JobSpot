import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
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
				<CartesianGrid strokeDasharray="3 3" stroke="#555" />
				<XAxis dataKey="title" stroke="#FFF" />
				<YAxis
					stroke="#FFF"
					type="number"
					tickCount={6}
					allowDecimals={false}
				/>
				<Tooltip />
				<Legend wrapperStyle={{ color: "#FFF" }} />
				<Bar dataKey="applicants" fill="#708090" barSize={100} />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default CompanyJobChart;

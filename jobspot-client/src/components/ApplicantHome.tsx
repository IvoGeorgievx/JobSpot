import { Typography } from "@mui/material";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";

const data = [
	{ name: "Page A", uv: 400, pv: 2400, amt: 3200 },
	{ name: "Page A", uv: 500, pv: 2600, amt: 2400 },
	{ name: "Page A", uv: 600, pv: 2800, amt: 2100 },
	{ name: "Page A", uv: 700, pv: 2900, amt: 2400 },
];

const ApplicantHome = () => {
	return (
		<>
			<Typography>Saved Jobs </Typography>
			<Typography>Profile Completition</Typography>
			<Typography>Personalized Job Feed</Typography>
			<LineChart
				width={600}
				height={300}
				data={data}
				margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
			>
				<Line type="monotone" dataKey="uv" stroke="#8884d8" />
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
			</LineChart>
		</>
	);
};

export default ApplicantHome;

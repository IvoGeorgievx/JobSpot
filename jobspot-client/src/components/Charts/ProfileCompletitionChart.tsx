import { Stack, Typography, useTheme } from "@mui/material";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { RadialBar, RadialBarChart } from "recharts";

interface ProfileCompletionChartProps {
	completionPercentage: number;
}

const ProfileCompletionChart: React.FC<ProfileCompletionChartProps> = ({
	completionPercentage,
}) => {
	const theme = useTheme();

	const count = useMotionValue(0);
	const rounded = useTransform(() => Math.round(count.get()));

	useEffect(() => {
		const controls = animate(count, completionPercentage, { duration: 1.8 });
		return () => controls.stop();
	}, [count, completionPercentage]);

	const getCompletionColor = (completionPercentage: number) => {
		switch (true) {
			case completionPercentage >= 80:
				return theme.palette.success.main;
			case completionPercentage >= 50:
				return theme.palette.primary.main;
			case completionPercentage > 0:
				return theme.palette.warning.main;
			case completionPercentage === 0:
				return theme.palette.error.main;
		}
	};

	const fill = getCompletionColor(completionPercentage);

	const data = [
		{
			value: completionPercentage,
			fill,
		},
	];

	return (
		<Stack>
			<Stack alignSelf="center">
				<RadialBarChart
					width={175}
					height={175}
					cx="50%"
					cy="50%"
					innerRadius="80%"
					outerRadius="100%"
					barSize={20}
					startAngle={0}
					endAngle={360}
					data={data}
				>
					<RadialBar dataKey="value" fill="#8884d8" />
				</RadialBarChart>
			</Stack>
			<Stack
				p={2}
				border="1px solid #38444D"
				width={{ xs: "75%", md: "50%" }}
				borderRadius="16px"
				overflow="auto"
				bgcolor={theme.palette.background.paper}
			>
				<Typography textAlign="center" letterSpacing={1}>
					Profile Completition
				</Typography>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					gap={1}
				>
					<motion.pre
						style={{
							fontSize: 32,
							color: getCompletionColor(completionPercentage),
							padding: 0,
							margin: 0,
							textAlign: "center",
						}}
					>
						{rounded}
					</motion.pre>
					<Typography variant="body1">%</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ProfileCompletionChart;

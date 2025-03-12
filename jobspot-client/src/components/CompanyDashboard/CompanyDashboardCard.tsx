import { Box, Stack, Typography } from "@mui/material";

interface CompanyDashboardCardProps {
	title: string;
	background: string;
	value: React.ReactNode;
}

const CompanyDashboardCard: React.FC<CompanyDashboardCardProps> = ({
	title,
	background,
	value,
}) => {
	return (
		<Box
			sx={{
				padding: 2,
				borderRadius: "16px",
				border: "1px solid #38444D",
				background,
			}}
			flex={1}
			height="234px"
			maxWidth={{ xs: "100%", md: "22%" }}
			width={"100%"}
		>
			<Stack gap={4} justifyContent="space-evenly" height="100%">
				<Typography variant="h5" textAlign="center">
					{title}
				</Typography>
				<Typography variant="h3" textAlign="center">
					{value}
				</Typography>
			</Stack>
		</Box>
	);
};

export default CompanyDashboardCard;

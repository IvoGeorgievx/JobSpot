import { Container, Stack } from "@mui/material";
import { useGetUserProfile } from "../../hooks/queries/useGetUserProfile";
import ProfileCompletionChart from "../Charts/ProfileCompletitionChart";
import ApplicantGreetingCard from "./ApplicantGreetingCard";

const ApplicantHome = () => {
	const { data: userProfile } = useGetUserProfile();
	let completitionPercantage = 0;

	if (
		userProfile &&
		typeof userProfile === "object" &&
		"cvUrl" in userProfile
	) {
		const profileCompletition = {
			fullName: userProfile.fullName,
			cvUrl: userProfile.cvUrl,
			phone: userProfile.phone,
		};
		const filledFieldsCount = Object.values(profileCompletition).filter(
			(value) => value !== null
		).length;
		const totalFieldsCount = Object.values(profileCompletition).length;
		completitionPercantage = Math.floor(
			(filledFieldsCount / totalFieldsCount) * 100
		);
	}

	return (
		<Container
			maxWidth="xl"
			sx={{
				backgroundImage:
					"linear-gradient(90deg, #0F1419 0%, #5A666B 50%, #0F1419 100%)",
				minHeight: "calc(100vh - 65px)",
				paddingTop: 4,
			}}
		>
			<Stack
				direction={{ xs: "column", md: "row" }}
				gap={2}
				flexWrap="wrap"
				alignItems="center"
				justifyContent="center"
				height="338.5px"
			>
				<Stack
					flex={1}
					sx={{
						borderRadius: "16px",
						border: "1px solid #38444D",
						padding: "16px",
						backdropFilter: "brightness(0.8)",
						width: "40%",
						height: "338.5px",
					}}
				>
					<ApplicantGreetingCard />
				</Stack>
				<Stack
					sx={{
						borderRadius: "16px",
						border: "1px solid #38444D",
						padding: "16px",
						backdropFilter: "brightness(0.8)",
						width: "30%",
						minWidth: "225px",
						height: "338.5px",
					}}
				>
					<ProfileCompletionChart
						completionPercentage={completitionPercantage}
					/>
				</Stack>
			</Stack>
		</Container>
	);
};

export default ApplicantHome;

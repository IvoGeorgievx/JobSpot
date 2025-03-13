import { Container, Stack } from "@mui/material";
import { useGetUserProfile } from "../../hooks/queries/useGetUserProfile";
import ProfileCompletionChart from "../Charts/ProfileCompletitionChart";
import DashboardCard from "../DashboardCard";
import ApplicantGreetingCard from "./ApplicantGreetingCard";
import { useGetUserJobApplications } from "../../hooks/queries/useGetUserJobApplications";
import MotionNumbers from "../Theme/MotionNumbers";
import { ApplicationStatus } from "../../types/job-application-type";

const ApplicantHome = () => {
	const { data: userProfile } = useGetUserProfile();
	const { data: userApplications } = useGetUserJobApplications();

	let completitionPercantage = 0;
	const reviewedApplications =
		userApplications?.filter(
			(application) => application.status === ApplicationStatus.REVIEWED
		) ?? [];

	const rejectedApplications =
		userApplications?.filter(
			(application) => application.status === ApplicationStatus.REJECTED
		) ?? [];

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
			<Stack direction={{ xs: "column", md: "row" }} gap={2}>
				<Stack
					flex={1}
					sx={{
						borderRadius: "16px",
						border: "1px solid #38444D",
						padding: "16px",
						backdropFilter: "brightness(0.8)",
						width: { xs: "100%", md: "40%" },
						height: { xs: "auto", md: "338.5px" },
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
						width: { xs: "100%", md: "30%" },
						minWidth: "225px",
						height: { xs: "auto", md: "338.5px" },
					}}
				>
					<ProfileCompletionChart
						completionPercentage={completitionPercantage}
					/>
				</Stack>
			</Stack>
			<Stack
				direction={{ xs: "column", md: "row" }}
				justifyContent="space-evenly"
				alignItems="center"
				p={2}
				gap={2}
				mt={2}
				sx={{
					backdropFilter: "brightness(0.8)",
					borderRadius: "16px",
					border: "1px solid #38444D",
				}}
			>
				<DashboardCard
					key={"1"}
					background="linear-gradient(to bottom, #2E0D3B, #511E56)"
					title="Total Applications"
					value={
						userApplications ? (
							<MotionNumbers value={userApplications.length} />
						) : (
							0
						)
					}
				/>
				<DashboardCard
					key={"2"}
					background="linear-gradient(to bottom, #0D3B1D, #1E5631)"
					title="Reviewed Applications"
					value={
						userApplications ? (
							<MotionNumbers value={reviewedApplications.length} />
						) : (
							0
						)
					}
				/>
				<DashboardCard
					key={"2"}
					background="linear-gradient(to bottom, #3B0D0C, #641E16)"
					title="Rejected Applications"
					value={
						userApplications ? (
							<MotionNumbers value={rejectedApplications.length} />
						) : (
							0
						)
					}
				/>
			</Stack>
			<Stack
				direction={{ xs: "column", md: "row" }}
				justifyContent="space-evenly"
				alignItems="center"
				p={2}
				gap={2}
				mt={2}
				sx={{
					backdropFilter: "brightness(0.8)",
					borderRadius: "16px",
					border: "1px solid #38444D",
				}}
			></Stack>
		</Container>
	);
};

export default ApplicantHome;

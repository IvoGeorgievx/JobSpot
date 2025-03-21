import { Stack, Typography } from "@mui/material";
import { useGetUserProfile } from "../../hooks/queries/useGetUserProfile";

const ApplicantGreetingCard = () => {
	const { data: profile } = useGetUserProfile();
	let username;

	if (profile && "fullName" in profile) {
		username = profile.fullName;
	}
	return (
		<Stack gap={2} height={{ xs: "auto", md: "338.5px" }}>
			<Typography variant="h4">
				{username ? `Welcome Back, ${username}!` : "Welcome back!"}
			</Typography>
			<Typography variant="h6">Glad to see you again!</Typography>
		</Stack>
	);
};

export default ApplicantGreetingCard;

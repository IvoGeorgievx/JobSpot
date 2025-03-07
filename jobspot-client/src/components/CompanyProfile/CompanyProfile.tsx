import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { EditCompanyProfile } from "./EditCompanyProfile";
import { OverviewCompanyProfile } from "./OverviewCompanyProfile";
import { useAuth } from "../../providers/AuthProvider";
import { useGetUserProfile } from "../../hooks/queries/useGetUserProfile";

export const CompanyProfile = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const { user } = useAuth();

	const { data: profile } = useGetUserProfile();

	const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};
	return (
		<Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
			<Typography variant="h2" textAlign="center" color="textDisabled">
				Profile
			</Typography>
			<Stack>
				<Tabs value={tabIndex} onChange={handleTabChange} centered>
					<Tab label="Edit" />
					<Tab label="Overview" />
				</Tabs>
				<Box sx={{ marginTop: "2rem" }}>
					{tabIndex === 0 && (
						<Box>
							{user && profile && (
								<EditCompanyProfile user={user} profile={profile} />
							)}
						</Box>
					)}
					{tabIndex === 1 && (
						<Box>
							{user && profile && (
								<OverviewCompanyProfile user={user} profile={profile} />
							)}
						</Box>
					)}
				</Box>
			</Stack>
		</Container>
	);
};

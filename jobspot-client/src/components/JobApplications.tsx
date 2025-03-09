import { Container, Stack, Typography } from "@mui/material";
import { useGetUserJobApplications } from "../hooks/queries/useGetUserJobApplications";
import { ApplicationStatus } from "../types/job-application-type";

const colorMap: Record<ApplicationStatus, string> = {
	[ApplicationStatus.APPLIED]: "secondary",
	[ApplicationStatus.REVIEWED]: "success",
	[ApplicationStatus.REJECTED]: "error",
};

const JobApplications = () => {
	const { data } = useGetUserJobApplications();

	return (
		<Container maxWidth="xl">
			<Typography color="textDisabled" variant="h4" textAlign="center" my={4}>
				My Applications
			</Typography>
			<Stack gap={2}>
				{data?.map((application) => (
					<>
						<Stack
							key={application.id}
							direction="row"
							justifyContent="space-between"
							sx={{
								borderRadius: "16px",
								border: "1px solid #38444D",
								padding: "16px",
								cursor: "pointer",
								transition: "background-color 0.2s ease",
								"&:hover": { backgroundColor: "#252F36" },
							}}
						>
							{application.id}
							<Typography color={colorMap[application.status]}>
								{application.status.charAt(0).toUpperCase() +
									application.status.slice(1).toLocaleLowerCase()}
							</Typography>
						</Stack>
					</>
				))}
			</Stack>
		</Container>
	);
};

export default JobApplications;

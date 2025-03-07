import ApprovalIcon from "@mui/icons-material/Approval";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
	Avatar,
	Button,
	Divider,
	Drawer,
	DrawerProps,
	Stack,
	Typography,
} from "@mui/material";
import { UserRole } from "../common/enums/user-role.enum";
import { useApplyJob } from "../hooks/mutations/useApplyJob";
import { useGetIfApplicantApplied } from "../hooks/queries/useGetJobApplicants";
import { useAuth } from "../providers/AuthProvider";
import { JobPosting } from "../types/job-type";

interface JobPostingDrawer extends Omit<DrawerProps, "children"> {
	jobPosting: JobPosting;
	onAbort: () => void;
}

export const JobPostingDrawer: React.FC<JobPostingDrawer> = ({
	jobPosting,
	onAbort,
	...drawerProps
}) => {
	const { user } = useAuth();
	const { mutate, isSuccess } = useApplyJob();
	const { data: hasApplied, isLoading } = useGetIfApplicantApplied(
		jobPosting.id
	);

	const handleApply = () => {
		if (!user?.id || !jobPosting.id) {
			return;
		}

		mutate({ userId: user.id, jobPostingId: jobPosting.id });
	};

	return (
		<Drawer
			{...drawerProps}
			anchor="right"
			sx={{ padding: "16px" }}
			PaperProps={{
				sx: {
					width: "50%",
					backgroundColor: "#0F1419",
					padding: "16px",
				},
			}}
		>
			<CloseIcon
				onClick={onAbort}
				sx={{
					alignSelf: "flex-end",
					cursor: "pointer",
					transition: "transform 0.2s ease-in-out",
					"&:hover": {
						transform: "scale(1.2)",
					},
					"&:active": {
						transform: "scale(0.9)",
						transition: "transform 0.1s ease-in-out",
					},
				}}
			/>
			<Stack justifyContent="center" flexDirection="row" mt={2}>
				<Avatar />
			</Stack>
			<Divider sx={{ marginY: 2 }} />
			<Stack gap={2}>
				<Typography textAlign="center" variant="body1" gap={2}>
					{jobPosting.title}
				</Typography>
				<Divider />
				<Typography variant="h5">The Job:</Typography>
				<Typography variant="body2">{jobPosting.jobType}</Typography>
				<Typography variant="body2">{jobPosting.description}</Typography>
				<Divider />
				<Typography variant="h5">Requirements:</Typography>
				<Typography variant="body2">{jobPosting.requirements}</Typography>
				<Divider />
				<Typography variant="h5">Responsibilities:</Typography>
				<Typography variant="body2">{jobPosting.responsibilities}</Typography>
				<Typography variant="h5">Salary Range:</Typography>
				<Typography variant="body2">
					{jobPosting.salaryMin} - {jobPosting.salaryMax} BGN
				</Typography>
				<Divider />
				{user?.role === UserRole.APPLICANT &&
					(!hasApplied && !isLoading ? (
						<Button
							onClick={handleApply}
							disabled={isSuccess}
							sx={{ mt: 4 }}
							variant="contained"
							color="success"
							startIcon={<ApprovalIcon />}
						>
							Apply for this job.
						</Button>
					) : (
						<Button
							onClick={handleApply}
							disabled={true}
							sx={{ mt: 4 }}
							variant="contained"
							color="info"
							startIcon={<CheckIcon />}
						>
							Already applied
						</Button>
					))}
			</Stack>
		</Drawer>
	);
};

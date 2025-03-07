import {
	Avatar,
	Button,
	Container,
	Dialog,
	DialogContent,
	Divider,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { CompanyProfile } from "../../types/company-profile-type";
import { User } from "../../types/user-type";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const OverviewCompanyProfile = ({
	user,
	profile,
}: {
	user: User;
	profile: CompanyProfile;
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const count = useMotionValue(0);
	const rounded = useTransform(() => Math.round(count.get()));
	const navigate = useNavigate();

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	useEffect(() => {
		const controls = animate(count, 4, { duration: 2 });
		return () => controls.stop();
	}, [count]);
	return (
		<Container maxWidth="md">
			<Stack border="1px solid #38444D" p={4} borderRadius={"16px"}>
				<Stack
					flexDirection={{ xs: "column", md: "row" }}
					gap={{ xs: 4, md: 0 }}
					alignItems={{ xs: "center", md: "start" }}
					justifyContent="space-between"
					mx={6}
					mb={4}
				>
					{user.profilePicUrl ? (
						<Tooltip title="Enlarge">
							<Avatar
								onClick={handleDialogOpen}
								src={user.profilePicUrl}
								sx={{
									xs: { width: 54, height: 54 },
									md: { width: 72, height: 72 },
									cursor: "pointer",
								}}
							/>
						</Tooltip>
					) : (
						<Avatar src={user.profilePicUrl} sx={{ width: 72, height: 72 }} />
					)}
					<Stack gap={2}>
						<Typography variant="h5" color="textDisabled">
							Company Name
						</Typography>
						<Typography variant="h5">{profile.name}</Typography>
					</Stack>
				</Stack>
				<Divider />
				<Stack
					flexDirection={{ xs: "column", md: "row" }}
					gap={{ xs: 4, md: 0 }}
					alignItems={{ xs: "center", md: "start" }}
					justifyContent="space-between"
					mx={6}
					my={4}
				>
					<Typography variant="h5" color="textDisabled">
						Field of work:
					</Typography>
					<Typography variant="h5">{profile.field}</Typography>
				</Stack>
				<Divider />
				<Stack
					flexDirection={{ xs: "column", md: "row" }}
					gap={{ xs: 4, md: 0 }}
					alignItems={{ xs: "center", md: "start" }}
					justifyContent="space-between"
					mx={6}
					my={4}
				>
					<Typography variant="h5" color="textDisabled">
						Details:
					</Typography>
					<Typography
						sx={{
							wordBreak: "break-word",
							typography: { xs: "h6", md: "body1" },
						}}
					>
						{profile.details}
					</Typography>
				</Stack>
				<Divider />
				<Stack
					flexDirection={{ xs: "column", md: "row" }}
					gap={{ xs: 4, md: 0 }}
					alignItems={{ xs: "center", md: "start" }}
					justifyContent="space-between"
					mx={6}
					mt={4}
				>
					<Typography variant="h5" color="textDisabled">
						Job Postings:
					</Typography>
					<Typography variant="h5" overflow="auto" textAlign="center">
						<motion.pre style={{ fontSize: 23, color: "#4ff0b7" }}>
							{rounded}
						</motion.pre>
					</Typography>
				</Stack>
				<Divider />
				<Stack mx={6} mt={4}>
					<Button
						variant="text"
						onClick={() => navigate("/job-posting/company")}
					>
						{" "}
						View Job Postings
					</Button>
				</Stack>
			</Stack>
			<Dialog
				open={dialogOpen}
				onClose={handleDialogClose}
				maxWidth="md"
				fullWidth
			>
				<DialogContent>
					<img
						src={user.profilePicUrl}
						alt="Profile"
						style={{ width: "100%", height: "auto" }}
					/>
				</DialogContent>
			</Dialog>
		</Container>
	);
};

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemIcon,
	Stack,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import hired from "../assets/images/hired.svg";
import man from "../assets/images/man.svg";
import work from "../assets/images/work.svg";
import { UserRole } from "../common/enums/user-role.enum";
import { useAuth } from "../providers/AuthProvider";

export const Home = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	if (user?.role === UserRole.APPLICANT) {
		navigate("home/applicant", { replace: true });
	}
	return (
		<Grid container spacing={2}>
			<Grid
				sx={{
					display: {
						marginTop: "2rem",
					},
				}}
				size={2}
			></Grid>
			<Grid size={8}>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<Stack
						minHeight="40vh"
						justifyContent="center"
						alignItems="center"
						sx={{ mt: { xs: 4, md: 0 } }}
					>
						<Typography
							variant="h2"
							textAlign="center"
							sx={{
								fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
							}}
						>
							Find Jobs and Hire Talent with Ease
						</Typography>
					</Stack>
				</motion.div>
				<Grid container spacing={2} alignItems="center">
					<Grid size={{ xs: 12, md: 6 }}>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
						>
							<Typography
								sx={{ mb: { xs: 4, md: 0 } }}
								variant="h4"
								textAlign={{ xs: "center", md: "start" }}
							>
								JobSpot is your go-to platform for job searching and
								recruitment.
							</Typography>
						</motion.div>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.7 }}
						>
							<Stack
								justifyContent="center"
								sx={{ display: { xs: "none", md: "block" } }}
							>
								<Box
									component="img"
									src={work}
									alt="Illustration of work"
									sx={{
										height: { xs: 330, sm: 430 },
										width: { xs: 330, sm: 430 },
										maxWidth: "100%",
										maxHeight: "100%",
									}}
								/>
							</Stack>
						</motion.div>
					</Grid>
				</Grid>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 1 }}
				>
					<Grid container spacing={2} alignItems="center">
						<Grid
							size={{ xs: 12, md: 6 }}
							sx={{ display: { xs: "none", md: "block" } }}
						>
							<Box
								component="img"
								src={man}
								alt="Job seeker illustration"
								sx={{
									height: { xs: 330, sm: 430 },
									width: { xs: 330, sm: 430 },
									maxWidth: "100%",
									maxHeight: "100%",
								}}
							/>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Typography
								variant="h3"
								textAlign={{ xs: "center", md: "start" }}
								sx={{ fontSize: { xs: "1.75rem", sm: "2rem" }, my: 2 }}
							>
								For Job Seekers:
							</Typography>
							<List>
								<motion.div
									initial={{ x: 20, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 9,
										delay: 0.2,
									}}
								>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Browse a wide range of job listings
										</Typography>
									</ListItem>
								</motion.div>
								<motion.div
									initial={{ x: 20, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 9,
										delay: 0.3,
									}}
								>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Apply with a single click
										</Typography>
									</ListItem>
								</motion.div>
								<motion.div
									initial={{ x: 20, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 9,
										delay: 0.4,
									}}
								>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Track your application status
										</Typography>
									</ListItem>
								</motion.div>
							</List>
						</Grid>
					</Grid>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 1 }}
				>
					<Grid container spacing={2} alignItems="center">
						<Grid size={{ xs: 12, md: 6 }}>
							<Typography
								variant="h3"
								textAlign={{ xs: "center", md: "start" }}
								sx={{ fontSize: { xs: "1.75rem", sm: "2rem" }, my: 2 }}
							>
								For Employers:
							</Typography>
							<List>
								<motion.div
									initial={{ x: 20, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 9,
										delay: 0.2,
									}}
								>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Post jobs in minutes
										</Typography>
									</ListItem>
								</motion.div>
								<motion.div
									initial={{ x: 20, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 9,
										delay: 0.3,
									}}
								>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Access a diverse talent pool
										</Typography>
									</ListItem>
								</motion.div>
								<motion.div
									initial={{ x: 20, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 9,
										delay: 0.4,
									}}
								>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Manage applications effortlessly
										</Typography>
									</ListItem>
								</motion.div>
							</List>
						</Grid>
						<Grid
							size={{ xs: 12, md: 6 }}
							sx={{ display: { xs: "none", md: "block" } }}
						>
							<Box
								component="img"
								src={hired}
								alt="Job seeker illustration"
								sx={{
									height: { xs: 330, sm: 430 },
									width: { xs: 330, sm: 430 },
									maxWidth: "100%",
									maxHeight: "100%",
								}}
							/>
						</Grid>
					</Grid>
				</motion.div>
				<Stack minHeight="30vh" justifyContent="center">
					<Typography
						textAlign="center"
						letterSpacing={2}
						variant="h3"
						sx={{ fontSize: { xs: "1.75rem", sm: "2rem" }, my: 2 }}
					>
						How it works?
					</Typography>
					<Stack flexDirection={{ xs: "column", md: "row" }} gap={4} mt={4}>
						<Stack
							flex={1}
							border="1px solid #38444D"
							borderRadius="16px"
							p={2}
							sx={{ backgroundColor: "background.paper", boxShadow: 1 }}
						>
							<Typography variant="h6" textAlign="center">
								Job Seeker
							</Typography>
							<Stack>
								<List>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Sign up and create your profile
										</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">Upload your CV</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Search for jobs that match your skills
										</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Apply and track your applications
										</Typography>
									</ListItem>
								</List>
							</Stack>
						</Stack>
						<Stack
							height="100%"
							justifyContent="center"
							flex={1}
							border="1px solid #38444D"
							borderRadius="16px"
							sx={{ backgroundColor: "background.paper", boxShadow: 1 }}
							p={2}
						>
							<Typography variant="h6" textAlign="center">
								Employer
							</Typography>
							<Stack>
								<List>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Create your company profile
										</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">Post job openings</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Look through CV's with ease
										</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<CheckCircleIcon color="success" />
										</ListItemIcon>
										<Typography variant="body1">
											Review and manage candidates
										</Typography>
									</ListItem>
								</List>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
				<Stack minHeight="20vh" justifyContent="center" gap={8} mt={8}>
					<Typography variant="h5" textAlign="center">
						Ready to get started? Sign up now and take the next step in your
						career or hiring journey!
					</Typography>

					<Stack width="20%" alignSelf="center">
						<motion.div
							whileHover={{
								scale: 1.1,
								rotate: 2,
								boxShadow: "0px 10px 20px rgba(0, 255, 0, 0.3)",
								transition: { type: "spring", stiffness: 300 },
							}}
							whileTap={{
								scale: 0.95,
								rotate: -2,
								transition: { type: "spring", stiffness: 400, damping: 10 },
							}}
						>
							<Button
								fullWidth
								variant="contained"
								color="success"
								href="/register"
							>
								Sign up
							</Button>
						</motion.div>
					</Stack>
				</Stack>
			</Grid>
		</Grid>
	);
};

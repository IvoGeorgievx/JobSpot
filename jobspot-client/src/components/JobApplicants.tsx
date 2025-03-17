import {
	Button,
	Container,
	Dialog,
	DialogContent,
	Stack,
	Typography,
} from "@mui/material";
import { Applicant } from "../types/applicant-type";
import { useLocation } from "react-router";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { JobPosting } from "../types/job-type";

interface JobApplicantsProps {
	applicants?: Applicant[];
}

export const JobApplicants: React.FC<JobApplicantsProps> = ({
	applicants = [],
}) => {
	const [dialogOpen, setDialogOpen] = useState<boolean[]>(
		new Array(applicants.length).fill(false)
	);
	const location = useLocation();
	const applicantsToRender = location.state?.applicants || applicants;
	const jobPosting: JobPosting = location.state.jobPosting;

	const handleOpenDialog = (index: number) => {
		const newDialogOpen = [...dialogOpen];
		newDialogOpen[index] = true;
		setDialogOpen(newDialogOpen);
	};

	const handleDialogClose = (index: number) => {
		const newDialogOpen = [...dialogOpen];
		newDialogOpen[index] = false;
		setDialogOpen(newDialogOpen);
	};

	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
			<Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
				<Typography variant="h3" textAlign="center" color="textDisabled">
					{jobPosting.title}
				</Typography>
				{applicantsToRender && applicantsToRender.length ? (
					<Stack direction="column" spacing={2} mt={2}>
						{applicantsToRender.map((applicant: Applicant, index: number) => (
							<>
								<Stack
									key={applicant.id}
									direction="row"
									spacing={1}
									sx={{
										border: "1px solid #38444D",
										borderRadius: "16px",
										padding: "16px",
									}}
								>
									<Stack flex={1}>{applicant.fullName}</Stack>
									{applicant.cvUrl ? (
										<>
											<Button
												href={applicant.cvUrl}
												variant="contained"
												sx={{ flex: 1 }}
												startIcon={<DownloadIcon />}
											>
												Download CV
											</Button>
											<Button
												onClick={() => handleOpenDialog(index)}
												variant="contained"
												sx={{ flex: 1 }}
												startIcon={<VisibilityIcon />}
											>
												View Applicant CV
											</Button>
										</>
									) : (
										<Typography>Applicant have no CV attached.</Typography>
									)}
								</Stack>
								<Dialog
									open={dialogOpen[index] || false}
									onClose={() => handleDialogClose(index)}
									maxWidth="md"
									fullWidth
								>
									<DialogContent>
										{applicant.cvUrl && <Viewer fileUrl={applicant.cvUrl} />}
									</DialogContent>
								</Dialog>
							</>
						))}
					</Stack>
				) : (
					<Typography mt={4} variant="h5" textAlign="center">
						No Applicants for this job
					</Typography>
				)}
			</Container>
		</Worker>
	);
};

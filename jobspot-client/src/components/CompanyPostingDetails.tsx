import { yupResolver } from "@hookform/resolvers/yup";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PageviewIcon from "@mui/icons-material/Pageview";
import SaveIcon from "@mui/icons-material/Save";
import {
	Button,
	Container,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useJobPosting } from "../hooks/mutations/useCreateJobPosting";
import { useGetSingleJobPosting } from "../hooks/queries/useGetJobPostings";
import { JobPosting, JobType } from "../types/job-type";
import { useGetJobApplicants } from "../hooks/queries/useGetJobApplicants";
import { Link } from "react-router";

interface FormData {
	title?: string;
	description?: string;
	field?: string;
	jobType?: JobType;
	requirements?: string;
	responsibilities?: string;
	salaryMin?: string;
	salaryMax?: string;
}

const schema = yup.object({
	title: yup.string(),
	description: yup.string(),
	field: yup.string(),
	jobType: yup.mixed<JobType>().oneOf(Object.values(JobType)),
	requirements: yup.string(),
	responsibilities: yup.string(),
	salaryMin: yup.string(),
	salaryMax: yup.string(),
});

const defaultValues: FormData = {
	title: "",
	description: "",
	field: "",
	jobType: JobType.FULL_TIME,
	requirements: "",
	responsibilities: "",
	salaryMin: "",
	salaryMax: "",
};

export const CompanyPostingDetails = ({
	jobPosting,
	onBack,
	page,
}: {
	jobPosting: JobPosting;
	onBack: (page: number) => void;
	page: number;
}) => {
	const { handleSubmit, register, setValue } = useForm({
		resolver: yupResolver(schema),
		defaultValues,
		mode: "onBlur",
	});
	const { data } = useGetSingleJobPosting(jobPosting.id);
	const {
		updateJobPosting: { mutate, isPending, isSuccess },
	} = useJobPosting();
	const { data: applicantData } = useGetJobApplicants(jobPosting.id);
	const [disableFields, setDisableFields] = useState(true);

	const onFormSubmit = (data: FormData) => {
		if (data) {
			mutate({ id: jobPosting.id, data });
		}
	};

	useEffect(() => {
		if (data) {
			setValue("title", data.title);
			setValue("description", data.description);
			setValue("field", data.field);
			setValue("jobType", data.jobType);
			setValue("requirements", data.requirements);
			setValue("responsibilities", data.responsibilities);
			setValue("salaryMin", data.salaryMin);
			setValue("salaryMax", data.salaryMax);
		}
	}, [data, setValue]);

	return (
		<motion.div
			initial={{ x: "100vw" }}
			animate={{ x: 0 }}
			exit={{ x: "100vw" }}
			transition={{ type: "tween", duration: 0.2 }}
			style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}
		>
			<Container maxWidth="lg">
				<Button variant="contained" onClick={() => onBack(page)}>
					Back
				</Button>
				<Stack
					sx={{
						borderRadius: "16px",
						border: "1px solid #38444D",
						padding: "16px",
						gap: 2,
					}}
				>
					{disableFields ? (
						<>
							<Stack border="1px solid #38444D" p={2} borderRadius={"16px"}>
								<Stack gap={2}>
									<Stack flexDirection="row" justifyContent="space-between">
										<Typography
											sx={{
												fontSize: {
													xs: "18px",
													md: "24px",
												},
											}}
											textAlign="center"
											variant="h5"
											color="textDisabled"
										>
											Title:
										</Typography>
										<Typography
											sx={{
												fontSize: {
													xs: "14px",
													md: "20px",
												},
											}}
											variant="h6"
											color="success"
										>
											{data?.title}
										</Typography>
									</Stack>
									<Divider />
									<Stack flexDirection="row" justifyContent="space-between">
										<Typography
											variant="h5"
											sx={{
												fontSize: {
													xs: "18px",
													md: "24px",
												},
											}}
											color="textDisabled"
										>
											Field:
										</Typography>
										<Typography
											variant="h6"
											sx={{
												fontSize: {
													xs: "14px",
													md: "20px",
												},
											}}
											color="success"
										>
											{data?.field}
										</Typography>
									</Stack>
									<Divider />
									<Stack flexDirection="row" justifyContent="space-between">
										<Typography
											variant="h5"
											sx={{
												fontSize: {
													xs: "18px",
													md: "24px",
												},
											}}
											color="textDisabled"
										>
											Descirption:
										</Typography>
										<Typography
											variant="h6"
											sx={{
												fontSize: {
													xs: "14px",
													md: "20px",
												},
											}}
											color="success"
										>
											{data?.description}
										</Typography>
									</Stack>
									<Divider />
									<Stack flexDirection="row" justifyContent="space-between">
										<Typography
											variant="h5"
											sx={{
												fontSize: {
													xs: "18px",
													md: "24px",
												},
											}}
											color="textDisabled"
										>
											Type:
										</Typography>
										<Typography
											variant="h6"
											sx={{
												fontSize: {
													xs: "14px",
													md: "20px",
												},
											}}
											color="success"
										>
											{data?.jobType}
										</Typography>
									</Stack>
									<Divider />
									<Stack flexDirection="row" justifyContent="space-between">
										<Typography
											variant="h5"
											sx={{
												fontSize: {
													xs: "18px",
													md: "24px",
												},
											}}
											color="textDisabled"
										>
											Requirements:
										</Typography>
										<Typography
											variant="h6"
											sx={{
												fontSize: {
													xs: "14px",
													md: "20px",
												},
											}}
											color="success"
										>
											{data?.requirements}
										</Typography>
									</Stack>
									<Divider />
									<Stack flexDirection="row" justifyContent="space-between">
										<Typography
											variant="h5"
											sx={{
												fontSize: {
													xs: "18px",
													md: "24px",
												},
											}}
											color="textDisabled"
										>
											Responsibilities:
										</Typography>
										<Typography
											variant="h6"
											sx={{
												fontSize: {
													xs: "14px",
													md: "20px",
												},
											}}
											color="success"
										>
											{jobPosting.responsibilities}
										</Typography>
									</Stack>
									<Divider />
									{data?.salaryMin && (
										<>
											<Stack flexDirection="row" justifyContent="space-between">
												<Typography
													variant="h5"
													sx={{
														fontSize: {
															xs: "18px",
															md: "24px",
														},
													}}
													color="textDisabled"
												>
													Min Salary Range:
												</Typography>
												<Typography
													variant="h6"
													sx={{
														fontSize: {
															xs: "14px",
															md: "20px",
														},
													}}
													color="success"
												>
													{data?.salaryMin}
												</Typography>
											</Stack>
											<Divider />
										</>
									)}
									{jobPosting.salaryMax && (
										<>
											<Stack flexDirection="row" justifyContent="space-between">
												<Typography
													variant="h5"
													sx={{
														fontSize: {
															xs: "18px",
															md: "24px",
														},
													}}
													color="textDisabled"
												>
													Max Salary Range:
												</Typography>
												<Typography variant="h6" color="success">
													{data?.salaryMin}
												</Typography>
											</Stack>
											<Divider />
										</>
									)}
									<Stack flexDirection="row" justifyContent="space-between">
										<Typography
											variant="h5"
											sx={{
												fontSize: {
													xs: "18px",
													md: "24px",
												},
											}}
											color="textDisabled"
										>
											<Link
												to="/job-applicants"
												state={{ applicants: applicantData, jobPosting }}
												style={{ textDecoration: "underline" }}
											>
												Applicants:
											</Link>
										</Typography>
										<Typography variant="h6" color="success">
											{applicantData?.length ?? 0}
										</Typography>
									</Stack>
								</Stack>
							</Stack>
							<Button
								variant="contained"
								sx={{ alignSelf: "center", width: { xs: "45%", md: "25%" } }}
								onClick={() => setDisableFields(!disableFields)}
								startIcon={<EditNoteIcon />}
							>
								Edit
							</Button>
						</>
					) : (
						<>
							<TextField
								disabled={disableFields}
								id="title"
								label="Title"
								variant="standard"
								{...register("title")}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<TextField
								disabled={disableFields}
								id="field"
								label="Field"
								variant="standard"
								{...register("field")}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<TextField
								id="description"
								label="Description"
								variant="standard"
								disabled={disableFields}
								{...register("description")}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<FormControl variant="standard" fullWidth>
								<InputLabel id="job-type">Job Type</InputLabel>
								<Select
									{...register("jobType")}
									labelId="job-type"
									id="job-type"
									label="Job Type"
									defaultValue={data?.jobType}
								>
									<MenuItem value={JobType.FULL_TIME}>Full time</MenuItem>
									<MenuItem value={JobType.TEMPORARY}>Temporary</MenuItem>
									<MenuItem value={JobType.CONTRACT}>Contract</MenuItem>
									<MenuItem value={JobType.FREELANCE}>Freelance</MenuItem>
									<MenuItem value={JobType.PART_TIME}>Part Time</MenuItem>
									<MenuItem value={JobType.INTERN}>Internship</MenuItem>
								</Select>
							</FormControl>
							<TextField
								id="requirements"
								label="Requirements"
								variant="standard"
								disabled={disableFields}
								{...register("requirements")}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<TextField
								id="responsibilities"
								label="Responsibilities"
								variant="standard"
								disabled={disableFields}
								{...register("responsibilities")}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<TextField
								id="salary-min"
								label="Minimum Salary"
								variant="standard"
								disabled={disableFields}
								{...register("salaryMin")}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<TextField
								id="salary-max"
								label="Maximum Salary"
								variant="standard"
								disabled={disableFields}
								{...register("salaryMax")}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<Button
								sx={{ alignSelf: "center", width: { xs: "45%", md: "25%" } }}
								variant="contained"
								onClick={() => setDisableFields(!disableFields)}
								startIcon={<PageviewIcon />}
							>
								View
							</Button>
							<Button
								sx={{ alignSelf: "center", width: { xs: "45%", md: "25%" } }}
								loading={isPending}
								loadingPosition="start"
								onClick={handleSubmit(onFormSubmit)}
								startIcon={<SaveIcon />}
								variant="contained"
								color={isSuccess ? "success" : "primary"}
							>
								Save
							</Button>
						</>
					)}
				</Stack>
			</Container>
		</motion.div>
	);
};

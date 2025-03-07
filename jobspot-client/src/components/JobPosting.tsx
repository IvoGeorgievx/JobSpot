import { yupResolver } from "@hookform/resolvers/yup";
import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useJobPosting } from "../hooks/mutations/useCreateJobPosting";
import { JobType } from "../types/job-type";

type FormData = {
	title: string;
	description: string;
	field: string;
	responsibilities: string;
	jobType: JobType;
	requirements: string;
	salaryMin?: number;
	salaryMax?: number;
};

const schema = yup.object({
	title: yup.string().required("Job title is required field."),
	description: yup.string().required("Job description is required field."),
	field: yup.string().required("Field of work is required."),
	requirements: yup.string().required("Requirements is required field."),
	responsibilities: yup
		.string()
		.required("Responsibilities is required field."),
	jobType: yup
		.mixed<JobType>()
		.oneOf(Object.values(JobType))
		.required("Job type is required field."),
	salaryMin: yup.number().optional(),
	salaryMax: yup.number().optional(),
});

const defaultValues: FormData = {
	title: "",
	description: "",
	field: "",
	responsibilities: "",
	jobType: JobType.FULL_TIME,
	requirements: "",
	salaryMin: 0,
	salaryMax: 0,
};

export const JobPosting = () => {
	const {
		register,
		formState: errors,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues,
		mode: "onBlur",
	});

	const {
		createJobPosting: { mutate, isPending, isSuccess },
	} = useJobPosting();

	const handleSubmitForm = (data: FormData) => {
		mutate(data);
	};
	return (
		<Container maxWidth="md" sx={{ marginTop: "4rem" }}>
			<Typography variant="h2" textAlign="center" color="textDisabled">
				Job Posting
			</Typography>
			<Stack
				flexDirection="column"
				mt={2}
				gap={2}
				border={"1px solid #38444D"}
				p={2}
				borderRadius={"16px"}
			>
				<TextField
					{...register("title")}
					error={!!errors.errors.title}
					id="title"
					label="Title"
					variant="standard"
					placeholder="Enter Job Title"
					helperText={errors.errors.title?.message}
				/>
				<TextField
					{...register("description")}
					error={!!errors.errors.description}
					id="description"
					label="Description"
					variant="standard"
					placeholder="Enter job description"
					multiline
					maxRows={6}
					helperText={errors.errors.description?.message}
				/>
				<TextField
					{...register("field")}
					error={!!errors.errors.field}
					id="field"
					label="Field"
					variant="standard"
					placeholder="Enter job field"
					helperText={errors.errors.field?.message}
				/>
				<TextField
					{...register("responsibilities")}
					error={!!errors.errors.responsibilities}
					id="responsibilities"
					label="Responsibilities"
					variant="standard"
					placeholder="Enter job responsibilities"
					multiline
					maxRows={6}
					helperText={errors.errors.responsibilities?.message}
				/>
				<TextField
					{...register("requirements")}
					error={!!errors.errors.requirements}
					id="requirements"
					label="Enter job requirements"
					variant="standard"
					placeholder="Requirements"
					multiline
					maxRows={6}
					helperText={errors.errors.requirements?.message}
				/>
				<TextField
					{...register("salaryMin")}
					error={!!errors.errors.salaryMin}
					label="Min Salary"
					variant="standard"
					placeholder="Enter minimum salary range"
					type="number"
					helperText={errors.errors.salaryMin?.message}
				/>
				<TextField
					{...register("salaryMax")}
					error={!!errors.errors.salaryMax}
					label="Max Salary"
					variant="standard"
					placeholder="Enter maximum salary range"
					type="number"
					helperText={errors.errors.salaryMax?.message}
				/>
				<FormControl variant="standard" fullWidth sx={{ marginBottom: 2 }}>
					<InputLabel id="job-type">Job Type</InputLabel>
					<Select
						{...register("jobType")}
						error={!!errors.errors.jobType}
						labelId="job-type"
						id="job-type"
						label="Job Type"
						defaultValue={JobType.FULL_TIME}
					>
						<MenuItem value={JobType.FULL_TIME}>Full time</MenuItem>
						<MenuItem value={JobType.TEMPORARY}>Part time</MenuItem>
						<MenuItem value={JobType.CONTRACT}>Contract</MenuItem>
						<MenuItem value={JobType.FREELANCE}>Freelance</MenuItem>
						<MenuItem value={JobType.PART_TIME}>Applicant</MenuItem>
						<MenuItem value={JobType.INTERN}>Internship</MenuItem>
					</Select>
				</FormControl>
				<Button
					disabled={isPending || isSuccess}
					variant="contained"
					color={isSuccess ? "success" : "primary"}
					onClick={handleSubmit(handleSubmitForm)}
				>
					{isPending ? "Creating" : "Create a Job Posting"}
				</Button>
			</Stack>
		</Container>
	);
};

import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
	Avatar,
	Button,
	Container,
	Input,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUpdateApplicantProfile } from "../hooks/mutations/useUpdateApplicantProfile";
import { useAuth } from "../providers/AuthProvider";

const defaultValues = {
	fullName: "",
	phone: "",
};
const schema = yup.object({
	fullName: yup.string().required(),
	phone: yup.string().required(),
});

export const ApplicantProfile: React.FC = () => {
	const { user } = useAuth();

	const { handleSubmit, register } = useForm({
		resolver: yupResolver(schema),
		defaultValues,
		mode: "onBlur",
	});

	const {
		updateProfile: { mutate: profileMutate },
		updateProfilePic: { mutate: profilePicMutate },
		updateCv: { mutate: cvMutate, isSuccess: cvUploadSuccess },
	} = useUpdateApplicantProfile();

	const profilePicRef = useRef<HTMLInputElement>(null);
	const cvRef = useRef<HTMLInputElement>(null);

	const onSubmit = (data: { fullName: string; phone: string }) => {
		profileMutate(data);
	};

	const onProfilePicChange = (files: FileList | null) => {
		if (files) {
			profilePicMutate(files[0]);
		}
	};

	const onCvChange = (files: FileList | null) => {
		if (files) {
			cvMutate(files[0]);
		}
	};

	const onCvChangeClick = () => {
		if (cvRef.current) {
			cvRef.current.click();
		}
	};

	const onAvatarClick = () => {
		if (profilePicRef.current) {
			profilePicRef.current.click();
		}
	};

	return (
		<Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
			<Typography variant="h2" textAlign="center" color="textDisabled">
				Profile
			</Typography>
			<Stack
				mt={2}
				sx={{
					borderRadius: "16px",
					border: "1px solid #38444D",
					padding: "16px",
					gap: 2,
				}}
			>
				<Stack>
					<Tooltip title="Upload profile picture">
						<Avatar
							onClick={onAvatarClick}
							src={user?.profilePicUrl}
							sx={{
								alignSelf: "center",
								width: 72,
								height: 72,
								cursor: "pointer",
							}}
						/>
					</Tooltip>

					<Input
						sx={{ display: "none" }}
						inputRef={profilePicRef}
						type="file"
						onChange={(event) =>
							onProfilePicChange((event.target as HTMLInputElement).files)
						}
					/>
				</Stack>
				<Stack gap={2}>
					<TextField
						id="name"
						label="Full Name"
						{...register("fullName")}
						variant="standard"
						placeholder="Enter your names"
					/>
					<TextField
						id="name"
						label="Phone"
						{...register("phone")}
						variant="standard"
						placeholder="Phone number"
					/>
					<Input
						sx={{ display: "none" }}
						inputRef={cvRef}
						type="file"
						onChange={(event) =>
							onCvChange((event.target as HTMLInputElement).files)
						}
					/>
					<Stack flexDirection="row" justifyContent="space-between">
						<Typography variant="h6">CV:</Typography>
						<Button>Preview</Button>
					</Stack>
					{cvUploadSuccess ? (
						<Button
							sx={{ width: { xs: "35%", md: "25%", alignSelf: "center" } }}
							onClick={onCvChangeClick}
							color="success"
							variant="contained"
							startIcon={<CheckIcon />}
						>
							Successfully uploaded
						</Button>
					) : (
						<Button
							sx={{ width: { xs: "35%", md: "25%", alignSelf: "center" } }}
							onClick={onCvChangeClick}
							variant="contained"
							startIcon={<UploadFileIcon />}
						>
							Upload CV
						</Button>
					)}
					<Button
						onClick={handleSubmit((data) => onSubmit(data))}
						variant="contained"
						startIcon={<SaveIcon />}
						sx={{ width: { xs: "35%", md: "25%", alignSelf: "center" } }}
					>
						Save
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};

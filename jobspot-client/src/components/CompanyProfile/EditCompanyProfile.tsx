import { yupResolver } from "@hookform/resolvers/yup";
import {
	Avatar,
	Button,
	CircularProgress,
	Input,
	Stack,
	TextField,
	Tooltip,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUpdateCompanyProfile } from "../../hooks/mutations/useUpdateCompanyProfile";
import { CompanyProfile } from "../../types/company-profile-type";
import { User } from "../../types/user-type";

interface FormData {
	name?: string;
	field?: string;
	details?: string;
}

const schema = yup.object({
	name: yup.string(),
	field: yup.string(),
	details: yup.string(),
});

const defaultValues: FormData = {
	name: "",
	field: "",
	details: "",
};

export const EditCompanyProfile = ({
	user,
	profile,
}: {
	user: User;
	profile: CompanyProfile;
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const {
		updateFields: { mutate: mutateFields, isPending },
		updateProfilePic: { mutate: mutateProfilePic },
	} = useUpdateCompanyProfile();
	const { register, handleSubmit, setValue } = useForm({
		resolver: yupResolver(schema),
		defaultValues,
		mode: "onBlur",
	});

	useEffect(() => {
		if (profile) {
			setValue("name", profile.name);
			setValue("field", profile.field);
			setValue("details", profile.details);
		}
	}, [profile, setValue]);

	const saveChanges = (data: FormData) => {
		if (!data.details && !data.field && !data.name) {
			return;
		}

		mutateFields(data);
	};

	const handleUpload = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const onProfilePicChange = (file: FileList | null) => {
		if (file) {
			mutateProfilePic(file[0]);
		}
	};

	return (
		<Stack justifyContent="center" alignItems="center" gap={3}>
			<Tooltip title="Upload profile picture">
				<Avatar
					onClick={handleUpload}
					src={user.profilePicUrl}
					sx={{ width: 72, height: 72, cursor: "pointer" }}
				/>
			</Tooltip>
			<Input
				sx={{ display: "none" }}
				type="file"
				inputRef={fileInputRef}
				onChange={(event) =>
					onProfilePicChange((event.target as HTMLInputElement).files)
				}
			/>
			<TextField
				fullWidth
				variant="standard"
				label="Company Name"
				slotProps={{ inputLabel: { shrink: true } }}
				// ^ this is known issue in mui --> reference: https://mui.com/material-ui/react-text-field/#limitations
				defaultValue={profile?.name}
				{...register("name")}
			/>
			<TextField
				fullWidth
				variant="standard"
				label="Field"
				defaultValue={profile?.field}
				slotProps={{ inputLabel: { shrink: true } }}
				{...register("field")}
			/>
			<TextField
				fullWidth
				variant="standard"
				label="Details"
				slotProps={{ inputLabel: { shrink: true } }}
				defaultValue={profile?.details}
				multiline
				maxRows={6}
				{...register("details")}
			/>
			<Button
				variant="contained"
				onClick={handleSubmit((data) => saveChanges(data))}
				disabled={isPending}
				startIcon={isPending ? <CircularProgress size={20} /> : null}
				sx={{ width: "120px" }}
			>
				{isPending ? "Saving..." : "Save"}
			</Button>
		</Stack>
	);
};

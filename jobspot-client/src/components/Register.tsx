import { yupResolver } from "@hookform/resolvers/yup";
import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	FormControl,
	InputLabel,
	Link,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UserRole } from "../common/enums/user-role.enum";
import { useAuthActions } from "../hooks/mutations/useAuthActions";

interface FormData {
	email: string;
	password: string;
	role: UserRole;
}

const defaultValues: FormData = {
	email: "",
	password: "",
	role: UserRole.APPLICANT,
};

const schema = yup.object({
	email: yup
		.string()
		.email("You must provide a valid email")
		.required("You must provide an email"),
	password: yup
		.string()
		.min(8, "Password must be atleast 8 chars long")
		.required("You must provide a password"),
	role: yup.string().oneOf([UserRole.APPLICANT, UserRole.COMPANY]).required(),
});

export const Register = () => {
	const theme = useTheme();
	const backgroundColor =
		theme.palette.mode === "dark"
			? "linear-gradient(to right, #333, #666)"
			: "linear-gradient(to right, #567dab, #89b4d6)";

	const { formState, handleSubmit, register } = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
		defaultValues,
	});

	const {
		signUp: { mutate, isSuccess, error },
	} = useAuthActions();

	const onSubmit = (data: FormData) => {
		mutate(data);
	};

	return (
		<Container
			sx={{
				minHeight: "calc(100vh - 70px)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					minHeight: "25%",
					minWidth: "25%",
					boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
					background: backgroundColor,
					borderRadius: "16px",
				}}
				padding={2}
			>
				<Stack gap={2} alignItems="center" mb={4}>
					<Avatar sx={{ width: 55, height: 55 }} />
					<TextField
						fullWidth
						error={!!formState.errors.email}
						{...register("email")}
						id="email"
						label="Email"
						helperText={formState.errors.email?.message}
						variant="standard"
					/>

					<TextField
						fullWidth
						{...register("password")}
						error={!!formState.errors.password}
						id="password"
						label="Password"
						variant="standard"
						helperText={formState.errors.password?.message}
					/>
					<FormControl variant="standard" fullWidth sx={{ marginBottom: 2 }}>
						<InputLabel id="user type">User Type</InputLabel>
						<Select
							{...register("role")}
							labelId="user-role"
							id="user-role"
							label="User Role"
							defaultValue={UserRole.APPLICANT}
						>
							<MenuItem value={UserRole.COMPANY}>Hiring Company</MenuItem>
							<MenuItem value={UserRole.APPLICANT}>Applicant</MenuItem>
						</Select>
					</FormControl>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant="contained"
						color={isSuccess ? "success" : "primary"}
					>
						Register
					</Button>

					{error && <Typography>{error.message}</Typography>}
					{/* TODO : ^ Fix this */}
				</Stack>
				<Divider component="div" role="presentation" sx={{ width: "100%" }}>
					<Typography variant="body2">or</Typography>
				</Divider>
				<Typography variant="body2" textAlign="center" mt={4}>
					{" "}
					Already have an account?{" "}
					<Link href="login" underline="always">
						Sign In
					</Link>
				</Typography>
			</Box>
		</Container>
	);
};

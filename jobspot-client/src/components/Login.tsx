import { yupResolver } from "@hookform/resolvers/yup";
import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Link,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuthActions } from "../hooks/mutations/useAuthActions";
import { useNavigate } from "react-router";

interface FormData {
	email: string;
	password: string;
}

const defaultValues: FormData = {
	email: "",
	password: "",
};

const schema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
});

export const Login = () => {
	const navigate = useNavigate();

	const { register, handleSubmit, formState } = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
		defaultValues,
	});

	const {
		signIn: { mutate, isSuccess },
	} = useAuthActions();

	const onSubmit = (data: FormData) => {
		mutate(data);
	};

	if (isSuccess) {
		navigate("/");
	}

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
					borderRadius: "16px",
					background: "linear-gradient(to right, #333, #666)",
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

					<Button
						onClick={handleSubmit(onSubmit)}
						variant="contained"
						sx={{ marginTop: 2 }}
					>
						Login
					</Button>
				</Stack>
				<Divider component="div" role="presentation" sx={{ width: "100%" }}>
					<Typography variant="body2">or</Typography>
				</Divider>
				<Typography variant="body2" textAlign="center" mt={4}>
					{" "}
					You don't have account?{" "}
					<Link href="register" underline="always">
						Sign Up
					</Link>
				</Typography>
			</Box>
		</Container>
	);
};

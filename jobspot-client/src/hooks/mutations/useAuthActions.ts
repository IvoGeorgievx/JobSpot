import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { API_URL } from "../../common/constants/api";
import { UserRole } from "../../common/enums/user-role.enum";
import { useAuth } from "../../providers/AuthProvider";

interface UserRegisterResponse {
	id: string;
	email: string;
	role: UserRole;
}

const register = async (data: {
	email: string;
	password: string;
	role: UserRole;
}) => {
	const response = await axios.post<UserRegisterResponse>(
		`${API_URL}/auth/signup`,
		data
	);
	return response.data;
};

const login = async (data: { email: string; password: string }) => {
	const response = await axios.post<{ accessToken: string }>(
		`${API_URL}/auth/signin`,
		data
	);
	return response.data;
};

export const useAuthActions = () => {
	const navigate = useNavigate();
	const { logout, refetchUser } = useAuth();

	const signUp = useMutation({
		mutationKey: ["register"],
		mutationFn: register,

		onError: (err: AxiosError) => {
			return err.response?.data;
		},
	});

	const signIn = useMutation({
		mutationKey: ["login"],
		mutationFn: login,
		onSuccess: async (data) => {
			localStorage.setItem("token", data.accessToken);
			refetchUser(data.accessToken);
			navigate("/");
		},
		onError: (err: AxiosError) => {
			return err.response?.data;
		},
	});

	const signOut = () => {
		logout();
		navigate("/");
	};

	return { signUp, signIn, signOut };
};

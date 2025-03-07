import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../shared/upload-profile-pic";
import { useAuth } from "../../providers/AuthProvider";

const updateProfileFields = async (data: {
	fullName: string;
	phone: string;
}) => {
	const token = localStorage.getItem("token");

	if (token) {
		const response = await axios.put(`${API_URL}/users/profile/update`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.status;
	}
};

const uploadCv = async (file: File) => {
	const token = localStorage.getItem("token");
	if (token) {
		const formData = new FormData();
		formData.append("file", file);
		const response = await axios.put(
			`${API_URL}/users/profile/update/cv`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data;
	}
};

export const useUpdateApplicantProfile = () => {
	const { refetchUser } = useAuth();
	const queryClient = useQueryClient();
	const updateProfile = useMutation({
		mutationKey: ["profile"],
		mutationFn: updateProfileFields,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});
	const updateProfilePic = useMutation({
		mutationKey: ["profile"],
		mutationFn: updateProfilePicture,
		onSuccess: () => {
			const token = localStorage.getItem("token");
			if (token) {
				refetchUser(token);
			}
		},
	});
	const updateCv = useMutation({
		mutationKey: ["profile"],
		mutationFn: uploadCv,
	});

	return { updateProfile, updateProfilePic, updateCv };
};

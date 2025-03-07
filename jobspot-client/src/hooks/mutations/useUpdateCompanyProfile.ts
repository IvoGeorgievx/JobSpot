import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { useAuth } from "../../providers/AuthProvider";
import { updateProfilePicture } from "../shared/upload-profile-pic";

interface UpdateCompanyProfile {
	name?: string;
	details?: string;
	field?: string;
}

const mutationFn = async (data: UpdateCompanyProfile) => {
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.put(`${API_URL}/users/profile/update`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	}
};

export const useUpdateCompanyProfile = () => {
	const queryClient = useQueryClient();
	const { refetchUser } = useAuth();
	const updateFields = useMutation({
		mutationKey: ["companyProfile"],
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	const updateProfilePic = useMutation({
		mutationKey: ["companyProfile"],
		mutationFn: updateProfilePicture,
		onSuccess: async () => {
			const token = localStorage.getItem("token");
			if (token) {
				refetchUser(token);
			}
		},
	});

	return { updateFields, updateProfilePic };
};

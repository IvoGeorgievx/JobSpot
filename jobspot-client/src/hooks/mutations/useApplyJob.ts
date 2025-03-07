import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { useMutation } from "@tanstack/react-query";

const mutationFn = async (userId: string, jobPostingId: string) => {
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.post(
			`${API_URL}/job-application/new`,
			userId,
			{
				headers: { Authorization: `Bearer ${token}` },
				params: { jobPostingId },
			}
		);

		return response.data;
	}
};

export const useApplyJob = () => {
	return useMutation({
		mutationKey: ["applyJob"],
		mutationFn: ({
			userId,
			jobPostingId,
		}: {
			userId: string;
			jobPostingId: string;
		}) => mutationFn(userId, jobPostingId),
	});
};

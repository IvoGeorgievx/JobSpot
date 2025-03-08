import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { JobPosting } from "./../../types/job-type";

const newJobPosting = async (data: Partial<JobPosting>) => {
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.post<JobPosting>(
			`${API_URL}/job-posting/new`,
			data,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	}
};

const editJobPosting = async (id: string, data: Partial<JobPosting>) => {
	console.log(typeof data.salaryMin);
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.put<JobPosting>(
			`${API_URL}/job-posting/update/${id}`,
			data,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		return response.data;
	}
};

export const useJobPosting = () => {
	const queryClient = useQueryClient();
	const createJobPosting = useMutation({
		mutationFn: (data: Partial<JobPosting>) => newJobPosting(data),
	});

	const updateJobPosting = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<JobPosting> }) =>
			editJobPosting(id, data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["company-jobs"] }),
	});

	return { createJobPosting, updateJobPosting };
};

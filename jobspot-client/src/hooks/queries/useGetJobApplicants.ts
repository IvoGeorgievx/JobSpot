import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { useQuery } from "@tanstack/react-query";
import { Applicant } from "../../types/applicant-type";

const queryFn = async (jobPostingId: string) => {
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.get<Applicant[]>(
			`${API_URL}/job-application/applicants`,
			{
				headers: { Authorization: `Bearer ${token}` },
				params: {
					jobPostingId,
				},
			}
		);

		return response.data;
	}
};

const applicantAppliedForJob = async (jobPostingId: string) => {
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.get<boolean>(
			`${API_URL}/job-application/${jobPostingId}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		return response.data;
	}
};

export const useGetIfApplicantApplied = (jobId: string) => {
	return useQuery({
		queryKey: ["applied-job", jobId],
		queryFn: () => applicantAppliedForJob(jobId),
	});
};

export const useGetJobApplicants = (jobPostingId: string) => {
	return useQuery({
		queryKey: ["job-applicants", jobPostingId],
		queryFn: () => queryFn(jobPostingId),
	});
};

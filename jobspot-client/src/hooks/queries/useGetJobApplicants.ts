import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { useQuery } from "@tanstack/react-query";
import { Applicant } from "../../types/applicant-type";
import { useAuth } from "../../providers/AuthProvider";
import { UserRole } from "../../common/enums/user-role.enum";
import { JobApplication } from "../../types/job-application-type";

const queryFn = async (jobPostingIds: string[]) => {
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.get<{
			applicants: Applicant[];
			jobApplications: JobApplication[];
		}>(`${API_URL}/job-application/applicants`, {
			headers: { Authorization: `Bearer ${token}` },
			params: {
				jobPostingIds,
			},
		});

		const { applicants, jobApplications } = response.data;

		return { applicants, jobApplications };
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
	const { user } = useAuth();
	const isApplicant = user?.role === UserRole.APPLICANT;
	return useQuery({
		queryKey: ["applied-job", jobId],
		queryFn: () => applicantAppliedForJob(jobId),
		enabled: isApplicant,
	});
};

export const useGetJobApplicants = (jobPostingIds: string[]) => {
	return useQuery({
		queryKey: ["job-applicants", jobPostingIds],
		queryFn: () => queryFn(jobPostingIds),
	});
};

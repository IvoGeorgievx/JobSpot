import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { JobPosting } from "../../types/job-type";
import { useAuth } from "../../providers/AuthProvider";
import { UserRole } from "../../common/enums/user-role.enum";
import { FilterPeriod } from "../../types/filter-period-type";

interface Filters {
	field?: string;
	salaryMin?: number;
	salaryMax?: number;
}

const fetchAllPostings = async (
	page: number,
	pageSize: number,
	filters: Filters = {}
) => {
	const token = localStorage.getItem("token");
	if (token) {
		const params: {
			page: number;
			pageSize: number;
			field?: string;
			salaryMin?: number;
			salaryMax?: number;
		} = {
			page,
			pageSize,
		};

		if (filters.field) {
			params.field = filters.field;
		}
		if (filters.salaryMin) {
			params.salaryMin = filters.salaryMin;
		}
		if (filters.salaryMax) {
			params.salaryMax = filters.salaryMax;
		}
		try {
			const response = await axios.get<{
				data: JobPosting[];
				total: number;
				totalPages: number;
			}>(`${API_URL}/job-posting/all`, {
				headers: { Authorization: `Bearer ${token}` },
				params,
			});

			return response.data;
		} catch (err) {
			console.error(err);
			throw err;
		}
	}
};

const fetchCompanyPostings = async (
	page: number,
	pageSize: number,
	period: "all" | "weekly" | "monthly" | "yearly" = "all"
) => {
	const token = localStorage.getItem("token");
	if (token) {
		try {
			const response = await axios.get<{
				data: JobPosting[];
				total: number;
				totalPages: number;
			}>(`${API_URL}/job-posting/current`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					page,
					pageSize,
					period,
				},
			});
			return response.data;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};
const fetchSingleJobPosting = async (jobPostingId: string) => {
	const token = localStorage.getItem("token");
	if (token) {
		try {
			const response = await axios.get<JobPosting>(
				`${API_URL}/job-posting/selected`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						jobPostingId,
					},
				}
			);
			return response.data;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

export const useGetJobPostings = (
	page: number,
	pageSize: number,
	filters: Filters = {},
	period?: FilterPeriod
) => {
	const { user } = useAuth();
	const allJobPostings = useQuery({
		queryKey: ["all-jobs", page, pageSize],
		queryFn: () => fetchAllPostings(page, pageSize, filters),
		refetchOnWindowFocus: false,
	});

	const companyJobPostings = useQuery({
		queryKey: ["company-jobs", page, pageSize, period],
		queryFn: () => fetchCompanyPostings(page, pageSize, period),
		refetchOnWindowFocus: false,
		enabled: user?.role === UserRole.COMPANY,
	});

	return { allJobPostings, companyJobPostings };
};

export const useGetSingleJobPosting = (jobPostingId: string) => {
	return useQuery({
		queryKey: ["company-jobs", jobPostingId],
		queryFn: () => fetchSingleJobPosting(jobPostingId),
		refetchOnWindowFocus: false,
	});
};

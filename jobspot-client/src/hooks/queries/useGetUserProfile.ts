import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { CompanyProfile } from "../../types/company-profile-type";
import { ApplicantProfile } from "../../types/applicant-profile-type";

const queryFn = async () => {
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.get<CompanyProfile | ApplicantProfile>(
			`${API_URL}/users/profile/me`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	}
};

export const useGetUserProfile = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn,
	});
};

import axios from "axios";
import { API_URL } from "../../common/constants/api";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
	const token = localStorage.getItem("token");
	if (token) {
		const response = await axios.get(`${API_URL}/job-application/user`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	}
};

export const useGetUserJobApplications = () => {
	return useQuery({
		queryKey: ["user-applications"],
		queryFn,
	});
};

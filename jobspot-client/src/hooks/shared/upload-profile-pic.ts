import axios from "axios";
import { API_URL } from "../../common/constants/api";

export const updateProfilePicture = async (file: File) => {
	const token = localStorage.getItem("token");
	if (token) {
		const formData = new FormData();
		formData.append("file", file);
		const response = await axios.put(
			`${API_URL}/users/profile/update/picture`,
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

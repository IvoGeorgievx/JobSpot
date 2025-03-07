import { UserRole } from "../common/enums/user-role.enum";

export interface User {
	id: string;
	email: string;
	role: UserRole;
	profilePicUrl: string;
}

import { Navigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { Backdrop, CircularProgress } from "@mui/material";

interface ProtectedRoutesProps {
	element: React.ReactNode;
	allowedRoles: string[];
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
	element,
	allowedRoles,
}) => {
	const { user, loading } = useAuth();
	if (loading) {
		return (
			<Backdrop open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}

	if (!user?.role && allowedRoles.includes("guest")) {
		return element;
	}
	if (user?.role && allowedRoles.some((role) => role === user.role)) {
		return element;
		// maybe I should create not found page sometime
	}

	return <Navigate to="/" replace />;
};

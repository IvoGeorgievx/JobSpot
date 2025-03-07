import { Navigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";

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
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/" replace />;
	}

	if (user?.role && allowedRoles.some((role) => role === user.role)) {
		return element;
		// maybe I should create not found page sometime
	}

	return <Navigate to="/" replace />;
};

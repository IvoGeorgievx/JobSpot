import axios from "axios";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { API_URL } from "../common/constants/api";
import { User } from "../types/user-type";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	logout: () => void;
	refetchUser: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetchUser = async (token: string) => {
	try {
		const response = await axios.get(`${API_URL}/auth/me`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const refetchUser = async (token: string) => {
		setLoading(true);
		try {
			const fetchedUser = await fetchUser(token);
			setUser(fetchedUser);
		} catch {
			setUser(null);
			localStorage.removeItem("token");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			refetchUser(token);
		} else {
			setLoading(false);
		}
	}, []);

	const logout = () => {
		setUser(null);
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider value={{ user, loading, logout, refetchUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRoutes } from "react-router";
import { routes } from "../../config/routes";
import { AuthProvider } from "../../providers/AuthProvider";
import { darkTheme } from "../../theme/dark-theme";
import { Header } from "../Header";

export const Layout: React.FC = () => {
	const queryClient = new QueryClient();
	const AppRoutes = () => {
		return useRoutes(routes);
	};
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={darkTheme}>
				<AuthProvider>
					<CssBaseline />
					<Header />
					<AppRoutes />
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

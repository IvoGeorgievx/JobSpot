import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#0F1419",
			paper: "#1E2528",
		},
		primary: {
			main: "#FFFFFF",
			contrastText: "black",
		},
		secondary: {
			main: "#1D9BF0",
			contrastText: "#AAB8C2",
		},
		text: {
			primary: "#FFFFFF",
			secondary: "#AAB8C2",
			disabled: "#657786",
		},
		divider: "#38444D",
	},
	typography: {
		fontFamily:
			"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
		body1: {
			fontSize: "15px",
		},
	},
});

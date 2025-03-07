import { Box, Typography } from "@mui/material";

interface SidebarProps {
	user?: null;
}

export const Sidebar: React.FC<SidebarProps> = () => {
	return (
		<Box
			flexDirection="column"
			sx={{ position: "sticky", maxHeight: 600 }}
			gap={2}
			p={2}
			borderRadius={"16px"}
			border={"1px solid #38444D"}
			mx={2}
			maxWidth={"100%"}
			overflow={"hidden"}
		>
			<Typography sx={{ textWrap: "wrap" }}>
				testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
			</Typography>
		</Box>
	);
};

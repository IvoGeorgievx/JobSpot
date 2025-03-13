import AdbIcon from "@mui/icons-material/Adb";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { UserRole } from "../common/enums/user-role.enum";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router";

export const Header = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const { user, logout, loading } = useAuth();
	const navigate = useNavigate();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleProfileClick = (route: string) => {
		navigate(route);
		setAnchorElUser(null);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		setAnchorElUser(null);
		logout();
	};

	return (
		<AppBar position="sticky">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href={
							user?.role === UserRole.APPLICANT
								? "/home/applicant"
								: "/home/company"
						}
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						JobSpot
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: "block", md: "none" } }}
						>
							<MenuItem>
								<Link href="/browse" underline="none">
									{" "}
									Browse Jobs{" "}
								</Link>
							</MenuItem>
							<MenuItem>
								<Link href="/job-posting" underline="none">
									Job posting
								</Link>
							</MenuItem>
							<MenuItem>
								<Link href="/job-posting/company" underline="none">
									Company Applications
								</Link>
							</MenuItem>
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						JobSpot
					</Typography>
					<Stack
						flexDirection="row"
						sx={{ display: { xs: "none", md: "flex" } }}
						gap={2}
					>
						<Link underline="none" href="/browse">
							<Typography variant="subtitle1">Browse Jobs</Typography>
						</Link>
						{user?.role === UserRole.COMPANY && (
							<Link
								sx={{ display: { xs: "none", md: "block" } }}
								href="/job-posting/company"
								underline="none"
							>
								<Typography variant="subtitle1">
									Company Applications
								</Typography>
							</Link>
						)}
					</Stack>
					{user?.role === UserRole.COMPANY && (
						<Link
							sx={{ display: { xs: "none", md: "block" } }}
							underline="none"
							ml={2}
							href="/job-posting"
						>
							<Typography variant="subtitle1">Job Posting</Typography>
						</Link>
					)}
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
					{loading ? null : user ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar src={user.profilePicUrl} />
								</IconButton>
							</Tooltip>

							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem
									onClick={() => {
										handleProfileClick(
											user.role === UserRole.APPLICANT
												? "profile/applicant"
												: "profile/company"
										);
									}}
								>
									Profile
								</MenuItem>
								{user && user.role === UserRole.APPLICANT && (
									<MenuItem
										onClick={() => handleProfileClick("profile/applications")}
									>
										My Applications
									</MenuItem>
								)}
								{user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
							</Menu>
						</Box>
					) : (
						<Button
							variant="outlined"
							color="success"
							startIcon={<LoginIcon />}
							href="/login"
						>
							Sign In
						</Button>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

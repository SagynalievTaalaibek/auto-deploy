import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ToysIcon from '@mui/icons-material/Toys';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { selectUser } from '../../../features/auth/authSlice.ts';
import { logoutUser } from '../../../features/auth/authThunks.ts';
import { NAVBAR_URL, ROUTES } from '../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/hooks/hooksStore.ts';

const settings = [
	{
		name: 'Регистрация',
		url: ROUTES.REGISTER,
	},
	{
		name: 'Войти',
		url: ROUTES.LOGIN,
	},
];
const settingsUser = [
	{
		name: 'Profile',
		url: ROUTES.PROFILE,
	},
];

const StyledLink = styled(Link)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: '#fff',
	textDecoration: 'none',
	fontWeight: 600,
	padding: '6px 12px',
	borderRadius: '4px',
	display: 'inline-block',
	'&:hover': {
		color: theme.palette.secondary.main,
		fontWeight: 700,
	},
}));

export function Navigation() {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const router = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null,
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const onLogout = async () => {
		await dispatch(logoutUser());
		router(ROUTES.HOME);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '15px 0',
			}}
		>
			<Typography
				variant="h6"
				noWrap
				component="a"
				href="#app-bar-with-responsive-menu"
				sx={{
					mr: 2,
					display: { xs: 'none', md: 'flex' },
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
				}}
			>
				DT-AUTO
			</Typography>

			<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
						vertical: 'bottom',
						horizontal: 'left',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					open={Boolean(anchorElNav)}
					onClose={handleCloseNavMenu}
					sx={{ display: { xs: 'block', md: 'none' } }}
				>
					{NAVBAR_URL.map((page, index) => (
						<MenuItem
							key={`${index}-menu-${page.name}`}
							onClick={handleCloseNavMenu}
						>
							<StyledLink
								style={{
									textDecoration: 'none',
									color: 'inherit',
									backgroundColor: 'white',
								}}
								to={page.path}
							>
								{page.name}
							</StyledLink>
						</MenuItem>
					))}
				</Menu>
			</Box>
			<Typography
				variant="h5"
				noWrap
				component="a"
				href={ROUTES.HOME}
				sx={{
					mr: 2,
					display: { xs: 'flex', md: 'none' },
					flexGrow: 1,
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
				}}
			>
				DT-AUTO
			</Typography>
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{NAVBAR_URL.map((page, index) => (
					<StyledLink key={`${index}-${page.name}`} to={page.path}>
						{page.name}
					</StyledLink>
				))}
			</Box>
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Открыть">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						{user ? (
							<AccountCircleIcon sx={{ fontSize: '35px' }} />
						) : (
							<ToysIcon sx={{ fontSize: '35px' }} />
						)}
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: '45px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					{user
						? settingsUser.map((setting, index) => (
								<MenuItem
									key={`${index}-user-${setting.name}`}
									onClick={handleCloseUserMenu}
								>
									<Typography
										onClick={() => router(setting.url)}
										sx={{
											textAlign: 'center',
											textDecoration: 'none',
											color: 'inherit',
										}}
									>
										{setting.name}
									</Typography>
								</MenuItem>
							))
						: settings.map((setting, index) => (
								<MenuItem
									key={`${index}-anonymous-${setting.name}`}
									onClick={handleCloseUserMenu}
								>
									<Typography
										component={Link}
										to={setting.url}
										sx={{
											textAlign: 'center',
											textDecoration: 'none',
											color: 'inherit',
										}}
									>
										{setting.name}
									</Typography>
								</MenuItem>
							))}
					{user && (
						<MenuItem onClick={handleCloseUserMenu}>
							<Typography
								sx={{
									textAlign: 'center',
								}}
								onClick={() => onLogout()}
							>
								Logout
							</Typography>
						</MenuItem>
					)}
				</Menu>
			</Box>
		</Box>
	);
}

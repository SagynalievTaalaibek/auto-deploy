import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { selectUser } from '../../../features/auth/authSlice.ts';
import { ROUTES } from '../../../shared/constants/constants.ts';
import { useAppSelector } from '../../../shared/hooks/hooksStore.ts';

export function LoadingScreen() {
	const user = useAppSelector(selectUser);
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 3,
				textAlign: 'center',
			}}
		>
			<CircularProgress color="primary" size={60} />
			{!user && (
				<>
					<Typography variant="h6" color="textSecondary">
						Пользователь не авторизован
					</Typography>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => navigate(ROUTES.LOGIN)}
					>
						Перейти к входу
					</Button>
				</>
			)}
		</Box>
	);
}

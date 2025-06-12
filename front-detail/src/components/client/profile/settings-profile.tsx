import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Edit as EditIcon, Email, Phone } from '@mui/icons-material';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';

import { selectUser } from '../../../features/auth/authSlice.ts';
import { ROUTES } from '../../../shared/constants/constants.ts';
import { useAppSelector } from '../../../shared/hooks/hooksStore.ts';

export function SettingsProfile() {
	const user = useAppSelector(selectUser);
	const router = useNavigate();

	useEffect(() => {
		if (user === null) {
			router(ROUTES.LOGIN);
		}
	}, [user, router]);

	return (
		<Box sx={{ mt: 4 }}>
			{user && (
				<Card sx={{ p: 3 }}>
					<Typography variant="h6" gutterBottom>
						Мои данные
					</Typography>
					<Stack spacing={1}>
						<Stack direction="row" alignItems="center" spacing={1}>
							<Phone fontSize="small" />
							<Typography>{user.phone}</Typography>
							<IconButton size="small">
								<EditIcon fontSize="small" />
							</IconButton>
						</Stack>
						<Stack direction="row" alignItems="center" spacing={1}>
							<Email fontSize="small" />
							<Typography>{user.email}</Typography>
							<IconButton size="small">
								<EditIcon fontSize="small" />
							</IconButton>
						</Stack>
					</Stack>
				</Card>
			)}
		</Box>
	);
}

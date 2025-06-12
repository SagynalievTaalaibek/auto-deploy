import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Phone } from '@mui/icons-material';
import { Button, Card, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CompanyAbout } from '../../../components/client/profile/company-about.tsx';
import { OrdersTable } from '../../../components/client/profile/orders-table.tsx';
import { SettingsProfile } from '../../../components/client/profile/settings-profile.tsx';
import { LoadingScreen } from '../../../components/ui/loading-screen/loading-screen.tsx';
import { selectUser } from '../../../features/auth/authSlice.ts';
import { selectOrdersLoading } from '../../../features/orders/orders.slice.ts';
import { fetchOrderProfile } from '../../../features/orders/orders.thunks.ts';
import { ROUTES } from '../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/hooks/hooksStore.ts';

export const Profile = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectOrdersLoading);
	const user = useAppSelector(selectUser);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchOrderProfile());
	}, [dispatch]);

	return (
		<Box>
			{(user && user.role === 'ADMIN') || (user && user.role === 'MASTER') ? (
				<Box
					sx={{
						height: '100vh',
						background: 'black',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant="h3"
						color="white"
						sx={{ mb: 4, fontWeight: 'bold', textShadow: '1px 1px 4px #000' }}
					>
						Добро пожаловать в CRM
					</Typography>

					<Button
						variant="contained"
						onClick={() => navigate(ROUTES.DASHBOARD)}
						sx={{
							fontSize: '1.5rem',
							padding: '1rem 3rem',
							borderRadius: '12px',
							backgroundColor: '#ffffff',
							color: '#000000',
							fontWeight: 'bold',
							boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
							transition: '0.3s',
							'&:hover': {
								backgroundColor: '#f0f0f0',
								boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
							},
						}}
					>
						Перейти в CRM
					</Button>
				</Box>
			) : (
				<Box className="container" sx={{ marginTop: '70px' }}>
					<CompanyAbout />
					<SettingsProfile />
					{loading ? <LoadingScreen /> : <OrdersTable />}
					<Box sx={{ mt: 4 }}>
						<Card sx={{ p: 3, backgroundColor: '#fff8e1' }}>
							<Typography variant="h6" gutterBottom>
								Отмена заказа
							</Typography>
							<Typography variant="body2" color="text.secondary" mb={1}>
								Если вы хотите отменить или изменить ваш заказ, пожалуйста,
								свяжитесь с нами по телефону как можно раньше.
							</Typography>
							<Stack direction="row" alignItems="center" spacing={1}>
								<Phone fontSize="small" />
								<Typography variant="body1" fontWeight={500}>
									+996 700 123 456
								</Typography>
							</Stack>
						</Card>
					</Box>
				</Box>
			)}
		</Box>
	);
};

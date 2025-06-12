import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	Paper,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { LoadingScreen } from '../../../components/ui/loading-screen/loading-screen.tsx';
import {
	selectAnalyticsDashboardActive,
	selectAnalyticsDashboardStats,
	selectAnalyticsLoading,
} from '../../../features/analytics/analytics.slice.ts';
import {
	fetchAnalyticsDashboardActive,
	fetchAnalyticsDashboardStats,
} from '../../../features/analytics/analytics.thunks.ts';
import { selectUser } from '../../../features/auth/authSlice.ts';
import { ROUTES } from '../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/hooks/hooksStore.ts';

export function Dashboard() {
	const dispatch = useAppDispatch();
	const router = useNavigate();
	const user = useAppSelector(selectUser);

	const loading = useAppSelector(selectAnalyticsLoading);
	const statsData = useAppSelector(selectAnalyticsDashboardStats);
	const activeData = useAppSelector(selectAnalyticsDashboardActive);

	useEffect(() => {
		dispatch(fetchAnalyticsDashboardStats());
		dispatch(fetchAnalyticsDashboardActive());
	}, [dispatch]);

	const stats = [
		{
			label: 'Заказы сегодня',
			value: statsData?.ordersToday,
			icon: <AssignmentTurnedInIcon color="primary" fontSize="large" />,
		},
		{
			label: 'Заказы за неделю',
			value: statsData?.ordersWeek,
			icon: <AccessTimeIcon color="secondary" fontSize="large" />,
		},
		{
			label: 'Выручка',
			value: statsData?.revenue,
			icon: <MonetizationOnIcon color="success" fontSize="large" />,
		},
		{
			label: 'Новые клиенты',
			value: statsData?.newClients,
			icon: <PersonAddIcon color="info" fontSize="large" />,
		},
	];

	return (
		<Box sx={{ width: '100%', p: 3 }}>
			<Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }} gutterBottom>
				Рабочий стол
			</Typography>

			{/* Панель статистики */}
			{loading ? (
				<LoadingScreen />
			) : (
				<Box>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={3}
						mb={4}
						justifyContent="space-between"
					>
						{stats.map(({ label, value, icon }) => (
							<Paper
								key={label}
								sx={{
									flex: 1,
									p: 2,
									display: 'flex',
									alignItems: 'center',
									gap: 2,
									boxShadow: 4,
									borderRadius: 2,
									minWidth: 200,
								}}
							>
								<Box>{icon}</Box>
								<Box>
									<Typography variant="subtitle2" color="text.secondary">
										{label}
									</Typography>
									<Typography variant="h5" fontWeight="bold">
										{value}
									</Typography>
								</Box>
							</Paper>
						))}
					</Stack>

					{/* Контейнер для активных заказов и быстрых действий */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							gap: 4,
							mb: 4,
						}}
					>
						{/* Активные заказы */}
						<Paper sx={{ flex: 2, p: 3, boxShadow: 4, borderRadius: 2 }}>
							<Typography variant="h6" mb={2}>
								Активные заказы на этой неделе
							</Typography>
							<List>
								{activeData.map(item => (
									<React.Fragment key={item.id}>
										<ListItem
											secondaryAction={
												<Tooltip title={'В процессе'}>
													<Typography
														color="primary"
														fontWeight="bold"
														sx={{ minWidth: 80 }}
													>
														{dayjs(item.startTime).format('D MMMM HH:mm')}
													</Typography>
												</Tooltip>
											}
										>
											<ListItemText
												primary={`${item.user.name} — ${item.orderCategories
													.map(oc => oc.category.name)
													.join(', ')}`}
												secondary={`Статус: В процессе`}
											/>
										</ListItem>
										<Divider component="li" />
									</React.Fragment>
								))}
							</List>
						</Paper>

						{/* Быстрые действия */}
						<Paper
							sx={{
								flex: 1,
								p: 3,
								boxShadow: 4,
								borderRadius: 2,
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								height: 'fit-content',
							}}
						>
							<Typography variant="h6" mb={2}>
								Быстрые действия
							</Typography>
							<Button
								variant="contained"
								startIcon={<AddCircleOutlineIcon />}
								fullWidth
								size="large"
								onClick={() => router(ROUTES.DASHBOARD_ORDER_ADD)}
							>
								Создать заказ
							</Button>
							{user && user.role === 'ADMIN' && (
								<Button
									variant="outlined"
									startIcon={<PersonAddIcon />}
									fullWidth
									size="large"
									onClick={() => router(ROUTES.DASHBOARD_STAFF)}
								>
									Добавить персонал
								</Button>
							)}
							<Button
								variant="outlined"
								startIcon={<EventNoteIcon />}
								fullWidth
								size="large"
								onClick={() => router(ROUTES.DASHBOARD_SERVICES)}
							>
								Записать на услугу
							</Button>
						</Paper>
					</Box>
				</Box>
			)}
		</Box>
	);
}

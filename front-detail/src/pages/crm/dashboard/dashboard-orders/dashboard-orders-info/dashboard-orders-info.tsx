import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Chip, Divider, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DashboardBreadcrumbs from '../../../../../components/ui/dashboard-breadcrumbs.tsx';
import { LoadingScreen } from '../../../../../components/ui/loading-screen/loading-screen.tsx';
import { selectUser } from '../../../../../features/auth/authSlice.ts';
import {
	selectOneOrder,
	selectOrdersLoading,
} from '../../../../../features/orders/orders.slice.ts';
import { fetchOneOrder } from '../../../../../features/orders/orders.thunks.ts';
import { ROUTES } from '../../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../shared/hooks/hooksStore.ts';

export const DashboardOrdersInfo = () => {
	const { id: orderId } = useParams<{ id: string }>();
	const router = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectOrdersLoading);
	const order = useAppSelector(selectOneOrder);
	const user = useAppSelector(selectUser);

	useEffect(() => {
		if (orderId) {
			dispatch(fetchOneOrder(orderId as string));
		}
	}, [dispatch, orderId]);

	if (loading) return <LoadingScreen />;

	if (!order) {
		return (
			<Box sx={{ py: 4 }}>
				<Typography variant="h6" color="error">
					Заказ не найден.
				</Typography>
			</Box>
		);
	}

	const carCoefficient = order.modelCar.brand.coefficient;
	const bodyCoefficient = order.bodyType.coefficient;

	const { totalMinPrice, totalMaxPrice } = order.orderServices.reduce(
		(acc, serv) => {
			const baseMin = serv.service.basePriceMin ?? 0;
			const baseMax = serv.service.basePriceMax ?? 0;
			const multiplier = carCoefficient * bodyCoefficient;

			acc.totalMinPrice += baseMin * multiplier;
			acc.totalMaxPrice += baseMax * multiplier;

			return acc;
		},
		{ totalMinPrice: 0, totalMaxPrice: 0 },
	);

	const onDeleteOrder = async () => {
		console.log('Удаление заказа:', order.id);
		router(ROUTES.DASHBOARD_ORDER);
	};

	return (
		<Box sx={{ p: 3 }}>
			<Box sx={{ py: 4 }}>
				<DashboardBreadcrumbs
					items={[
						{ label: 'Панель управления', href: ROUTES.DASHBOARD },
						{ label: 'Заказы', href: ROUTES.DASHBOARD_ORDER },
						{ label: 'Детали заказа' },
					]}
				/>

				<Divider sx={{ my: 2 }} />

				{/* Клиент */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Клиент
					</Typography>
					{order.user && (
						<>
							<Typography>Имя: {order.user.name}</Typography>
							<Typography>Email: {order.user.email}</Typography>
							<Typography>Телефон: {order.user.phone}</Typography>
						</>
					)}
				</Box>

				{/* Автомобиль */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Автомобиль
					</Typography>
					<Typography>
						{order.modelCar.brand.name} {order.modelCar.name} ({order.carYear})
					</Typography>
					<Typography>Цвет: {order.carColor}</Typography>
					<Typography>Кузов: {order.bodyType.name}</Typography>
				</Box>

				{/* Статус и дата */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Статус заказа
					</Typography>
					<Chip
						label={order.status}
						color={order.status === 'NEW' ? 'primary' : 'secondary'}
						sx={{ mt: 1 }}
					/>
					<Typography sx={{ mt: 2 }}>
						Создан: {new Date(order.createdAt).toLocaleString()}
					</Typography>
				</Box>

				{/* Категории */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Категории услуг
					</Typography>
					<Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
						{order.orderCategories &&
							order.orderCategories.map(cat => (
								<Chip key={cat.id} label={cat.category.name} />
							))}
					</Stack>
				</Box>

				{/* Услуги */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Услуги
					</Typography>
					<ul>
						{order.orderServices &&
							order.orderServices.map(serv => (
								<li key={serv.id}>
									<Typography>{serv.service.name}</Typography>
								</li>
							))}
					</ul>
				</Box>

				{/* Цена / время */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Дополнительная информация
					</Typography>
					<Typography>
						Мастер: {order.master ? order.master.name : '—'}
					</Typography>
					<Typography>
						Начало работ:{' '}
						{order.startTime ? new Date(order.startTime).toLocaleString() : '—'}
					</Typography>
					<Typography>
						Окончание работ:{' '}
						{order.endTime ? new Date(order.endTime).toLocaleString() : '—'}
					</Typography>
					<Typography>
						Общая стоимость: {order.totalPrice ?? '—'} сом
					</Typography>
					<Typography>
						Предварительная стоимость с учётом выбранных услуг: от{' '}
						{Math.round(totalMinPrice)} до {Math.round(totalMaxPrice)} сом
					</Typography>
					<Typography>Заметка: {order.notes}</Typography>
				</Box>
			</Box>

			<Divider sx={{ my: 4 }} />
			{user && user.role === 'ADMIN' && (
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" color="error" sx={{ fontWeight: 600 }}>
						Danger Zone
					</Typography>
					<Typography sx={{ mb: 2 }}>
						Будьте осторожны: действия ниже могут быть необратимыми.
					</Typography>
					<Chip
						label="Удалить заказ"
						size="medium"
						color="error"
						variant="outlined"
						clickable
						onClick={() => {
							// TODO: реализовать подтверждение и удаление
							if (
								confirm(
									'Вы уверены, что хотите удалить этот заказ? Это действие необратимо.',
								)
							) {
								void onDeleteOrder();
							}
						}}
					/>
				</Box>
			)}
		</Box>
	);
};

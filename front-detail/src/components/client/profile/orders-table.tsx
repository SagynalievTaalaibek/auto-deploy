import {
	Box,
	Card,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';

import { selectOrdersGetProfile } from '../../../features/orders/orders.slice.ts';
import { useAppSelector } from '../../../shared/hooks/hooksStore.ts';

export function OrdersTable() {
	const orders = useAppSelector(selectOrdersGetProfile);

	return (
		<Box sx={{ mt: 4 }}>
			<Card sx={{ p: 3 }}>
				<Typography variant="h6" gutterBottom>
					Мои заказы
				</Typography>
				<TableContainer component={Paper} sx={{ mt: 2 }}>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Машина</TableCell>
								<TableCell>Услуга</TableCell>
								<TableCell>Дата</TableCell>
								<TableCell>Статус</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map(order => (
								<TableRow key={order.id}>
									<TableCell>{order.modelCar.name}</TableCell>
									<TableCell>
										{order.orderCategories
											.map(item => item.category.name)
											.join(',  ')}
									</TableCell>
									<TableCell>
										{new Intl.DateTimeFormat('ru-RU', {
											day: '2-digit',
											month: 'long',
											year: 'numeric',
										}).format(new Date(order.createdAt))}
									</TableCell>
									<TableCell>{order.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Card>
		</Box>
	);
}

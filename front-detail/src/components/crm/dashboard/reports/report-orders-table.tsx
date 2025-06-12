import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';

import {
	selectReportsLoading,
	selectReportsOrders,
} from '../../../../features/reports/reports.slice.ts';
import { useAppSelector } from '../../../../shared/hooks/hooksStore.ts';
import { LoadingScreen } from '../../../ui/loading-screen/loading-screen.tsx';

export const ReportOrdersTable = () => {
	const orders = useAppSelector(selectReportsOrders);
	const loading = useAppSelector(selectReportsLoading);

	if (loading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="200px"
			>
				<LoadingScreen />
			</Box>
		);
	}

	if (!orders.length) {
		return (
			<Typography variant="body1" textAlign="center" mt={2}>
				Нет данных для отображения
			</Typography>
		);
	}

	return (
		<Box>
			<Paper sx={{ p: 3, mb: 4 }}>
				<Typography variant="h6" gutterBottom>
					Отчёт по заказам
				</Typography>
				<TableContainer
					component={Paper}
					sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}
				>
					<Table>
						<TableHead>
							<TableRow sx={{ backgroundColor: '#f9f9f9' }}>
								<TableCell>№</TableCell>
								<TableCell>Клиент</TableCell>
								<TableCell>Телефон</TableCell>
								<TableCell>Автомобиль</TableCell>
								<TableCell>Услуги</TableCell>
								<TableCell align="right">Сумма (СОМ)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((order, index) => (
								<TableRow
									key={order.id}
									sx={{
										'&:nth-of-type(odd)': {
											backgroundColor: 'rgba(0, 0, 0, 0.02)',
										},
									}}
								>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{order.client_name}</TableCell>
									<TableCell>{formatPhone(order.client_phone)}</TableCell>
									<TableCell>{order.car}</TableCell>
									<TableCell>
										{order.services.split(', ').map((service, i) => (
											<Typography variant="body2" key={i}>
												• {service.trim()}
											</Typography>
										))}
									</TableCell>
									<TableCell align="right">
										{order.totalPrice.toLocaleString('ru-RU')}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	);
};

const formatPhone = (phone: string) => {
	if (phone.length === 10) {
		return `+996 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
	}
	return phone;
};

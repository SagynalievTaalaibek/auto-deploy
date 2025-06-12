import {
	Box,
	Divider,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { selectReportFinance } from '../../../../features/reports/reports.slice.ts';
import { useAppSelector } from '../../../../shared/hooks/hooksStore.ts';

export const ReportFinanceTable = () => {
	const data = useAppSelector(selectReportFinance);

	if (!data) {
		return (
			<Typography textAlign="center" mt={2}>
				Нет данных по финансовому отчёту
			</Typography>
		);
	}

	const formatDate = (iso: string) =>
		format(new Date(iso), 'd MMMM yyyy', { locale: ru });

	return (
		<Box>
			<Paper sx={{ p: 3, mb: 4 }}>
				<Typography variant="h6" gutterBottom>
					📈 Финансовый отчёт
				</Typography>
				<Typography variant="body2" color="text.secondary" mb={2}>
					Период: {formatDate(data.from)} — {formatDate(data.to)}
				</Typography>

				<Box display="flex" gap={4} mb={3}>
					<Box>
						<Typography variant="subtitle2">Общая выручка</Typography>
						<Typography variant="h6" color="primary">
							{data.revenue.toLocaleString('ru-RU')} с.
						</Typography>
					</Box>
					<Box>
						<Typography variant="subtitle2">Кол-во заказов</Typography>
						<Typography variant="h6">{data.ordersCount}</Typography>
					</Box>
					<Box>
						<Typography variant="subtitle2">Средний чек</Typography>
						<Typography variant="h6">
							{Math.round(data.averageCheck).toLocaleString('ru-RU')} с.
						</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 2 }} />

				<Typography variant="subtitle1" gutterBottom>
					Доход по категориям услуг
				</Typography>

				<TableContainer component={Paper} variant="outlined">
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell>Категория</TableCell>
								<TableCell align="right">Выручка (СОМ)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.revenueByCategory.map((item, index) => (
								<TableRow key={item.categoryId}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.categoryName}</TableCell>
									<TableCell align="right">
										{item.totalRevenue.toLocaleString('ru-RU')}
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

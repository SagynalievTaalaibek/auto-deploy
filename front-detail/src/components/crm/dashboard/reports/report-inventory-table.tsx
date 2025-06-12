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
import dayjs from 'dayjs';

import { selectReportInventory } from '../../../../features/reports/reports.slice.ts';
import { useAppSelector } from '../../../../shared/hooks/hooksStore.ts';

export const ReportInventoryTable = () => {
	const inventoryData = useAppSelector(selectReportInventory);

	if (!inventoryData.length) {
		return (
			<Typography variant="body1" textAlign="center" mt={2}>
				Нет данных для отображения
			</Typography>
		);
	}

	return (
		<Box>
			<Typography variant="h6" mb={2}>
				📦 Отчет по запасам на складе
			</Typography>

			<TableContainer component={Paper} sx={{ maxHeight: 500 }}>
				<Table stickyHeader aria-label="inventory table">
					<TableHead>
						<TableRow>
							<TableCell>№</TableCell>
							<TableCell>Название</TableCell>
							<TableCell>Категория</TableCell>
							<TableCell align="right">Количество</TableCell>
							<TableCell align="right">Мин. уровень</TableCell>
							<TableCell align="right">Закупочная цена (СОМ)</TableCell>
							<TableCell align="right">Общая стоимость (СОМ)</TableCell>
							<TableCell align="center">Обновлено</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{inventoryData.map((item, index) => {
							const isBelowMin = item.quantity < item.minStockLevel;

							return (
								<TableRow
									key={item.id}
									sx={{
										bgcolor: isBelowMin ? 'rgba(255, 0, 0, 0.1)' : 'inherit',
									}}
								>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.category}</TableCell>
									<TableCell
										align="right"
										sx={{
											fontWeight: isBelowMin ? 'bold' : 'normal',
											color: isBelowMin ? 'error.main' : 'inherit',
										}}
									>
										{item.quantity}
									</TableCell>
									<TableCell align="right">{item.minStockLevel}</TableCell>
									<TableCell align="right">
										{item.purchasePrice?.toLocaleString('ru-RU') ?? '-'}
									</TableCell>
									<TableCell align="right">
										{item.totalCost?.toLocaleString('ru-RU') ?? '-'}
									</TableCell>
									<TableCell align="center">
										{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm')}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

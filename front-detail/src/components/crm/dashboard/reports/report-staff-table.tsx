import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { selectReportStaff } from '../../../../features/reports/reports.slice.ts';
import { useAppSelector } from '../../../../shared/hooks/hooksStore.ts';

export const ReportStaffTable = () => {
	const staffs = useAppSelector(selectReportStaff);

	return (
		<Box>
			<Typography variant="h6" mb={2}>
				👥 Отчет по сотрудникам
			</Typography>
			<TableContainer component={Paper}>
				<Table stickyHeader size="small" aria-label="staff report table">
					<TableHead>
						<TableRow>
							<TableCell>Имя</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Роль</TableCell>
							<TableCell>Специализация</TableCell>
							<TableCell align="right">Заказов (клиент)</TableCell>
							<TableCell align="right">Заказов (мастер)</TableCell>
							<TableCell align="right">Общий доход (мастер), ₽</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{staffs.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} align="center" sx={{ py: 4 }}>
									Данные отсутствуют
								</TableCell>
							</TableRow>
						) : (
							staffs.map(staff => (
								<TableRow key={staff.id} hover>
									<TableCell>{staff.name}</TableCell>
									<TableCell>{staff.email}</TableCell>
									<TableCell sx={{ textTransform: 'capitalize' }}>
										{staff.role.toLowerCase()}
									</TableCell>
									<TableCell>{staff.specialization ?? '-'}</TableCell>
									<TableCell align="right">{staff.ordersCount}</TableCell>
									<TableCell align="right">{staff.masterOrdersCount}</TableCell>
									<TableCell align="right">
										{staff.masterTotalRevenue.toLocaleString('ru-RU', {
											maximumFractionDigits: 0,
										})}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

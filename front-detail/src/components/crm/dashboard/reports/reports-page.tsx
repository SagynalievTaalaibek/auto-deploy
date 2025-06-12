import { useState } from 'react';
import { useRef } from 'react';

import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import html2pdf from 'html2pdf.js';

import { fetchReport } from '../../../../features/reports/reports.thunks.ts';
import { useAppDispatch } from '../../../../shared/hooks/hooksStore.ts';

import { ReportFinanceTable } from './report-finance-table.tsx';
import { ReportInventoryTable } from './report-inventory-table.tsx';
import { ReportOrdersTable } from './report-orders-table.tsx';
import { ReportStaffTable } from './report-staff-table.tsx';

export function ReportsPage() {
	const reportRef = useRef<HTMLDivElement>(null);

	const dispatch = useAppDispatch();
	const [startDate, setStartDate] = useState<Dayjs | null>(
		dayjs().startOf('month'),
	);
	const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
	const [reportType, setReportType] = useState('orders');
	const [showTable, setShowTable] = useState(false);

	const handleShow = async () => {
		await dispatch(fetchReport({ reportType, startDate, endDate }));
		setShowTable(true);
	};

	const handleExport = () => {
		const input = reportRef.current;
		if (!input) return;

		const opt = {
			margin: 5,
			filename: `report-${reportType}-${startDate?.format('YYYYMMDD')}-${endDate?.format('YYYYMMDD')}.pdf`,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
			pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
		};

		html2pdf().set(opt).from(input).save();
	};

	const renderReportTable = () => {
		switch (reportType) {
			case 'orders':
				return <ReportOrdersTable />;
			case 'finance':
				return <ReportFinanceTable />;
			case 'warehouse':
				return <ReportInventoryTable />;
			case 'staff':
				return <ReportStaffTable />;
			default:
				return null;
		}
	};

	return (
		<Box sx={{ py: 3, width: '100%' }}>
			<Paper sx={{ p: 3, mb: 4 }}>
				<Typography variant="h6" mb={2}>
					Параметры отчета
				</Typography>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<FormControl fullWidth>
						<InputLabel id="report-type-label">Тип отчета</InputLabel>
						<Select
							labelId="report-type-label"
							value={reportType}
							label="Тип отчета"
							onChange={e => {
								setReportType(e.target.value);
								setShowTable(false); // сброс отображения таблицы при смене типа
							}}
						>
							<MenuItem value="orders">Заказы</MenuItem>
							<MenuItem value="finance">Финансы</MenuItem>
							<MenuItem value="warehouse">Склад</MenuItem>
							<MenuItem value="staff">Персонал</MenuItem>
						</Select>
					</FormControl>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							<DatePicker
								label="Дата начала"
								value={startDate}
								onChange={newValue => setStartDate(newValue)}
							/>
							<DatePicker
								label="Дата окончания"
								value={endDate}
								onChange={newValue => setEndDate(newValue)}
							/>
						</Box>
					</LocalizationProvider>

					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button variant="contained" color="primary" onClick={handleShow}>
							🔍 Показать
						</Button>

						{showTable && (
							<Button
								variant="contained"
								color="secondary"
								onClick={handleExport}
							>
								📄 Экспорт в PDF
							</Button>
						)}
					</Box>
				</Box>
			</Paper>

			{showTable && (
				<div ref={reportRef}>
					<Paper sx={{ p: 3, mb: 4 }}>
						<Typography variant="h6" mb={2}>
							📊 Отчет: {startDate?.format('YYYY-MM-DD')} -{' '}
							{endDate?.format('YYYY-MM-DD')}
						</Typography>
						{renderReportTable()}
					</Paper>
				</div>
			)}

			<Paper sx={{ p: 3 }}>
				<Typography variant="h6" mb={2}>
					📌 Описание типов отчетов
				</Typography>
				<ul style={{ marginLeft: '1.2rem', lineHeight: 1.8 }}>
					<li>
						<strong>Заказы</strong>: список заказов за указанный период.
					</li>
					<li>
						<strong>Финансы</strong>: выручка, расходы, прибыль.
					</li>
					<li>
						<strong>Склад</strong>: движение материалов (поступление, списание).
					</li>
					<li>
						<strong>Пользователи</strong>: Количество пользователей.
					</li>
				</ul>
			</Paper>
		</Box>
	);
}

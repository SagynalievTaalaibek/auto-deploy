import { useEffect, useState } from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material';
import {
	Bar,
	BarChart,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import {
	selectAnalyticsByPeriod,
	selectAnalyticsLoading,
	selectAnalyticsPopularService,
	selectAnalyticsRange,
} from '../../../../features/analytics/analytics.slice.ts';
import {
	fetchAnalyticsByPeriod,
	fetchAnalyticsPopularService,
	fetchAnalyticsRange,
} from '../../../../features/analytics/analytics.thunks.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function AnalyticsPage() {
	const dispatch = useAppDispatch();
	const analyticsLoading = useAppSelector(selectAnalyticsLoading);
	const analyticsByPeriod = useAppSelector(selectAnalyticsByPeriod);
	const analyticsRange = useAppSelector(selectAnalyticsRange);
	const analyticsPopular = useAppSelector(selectAnalyticsPopularService);

	const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>(
		'week',
	);

	const [periodData, setPeriodData] = useState<'month' | 'year'>('month');

	useEffect(() => {
		dispatch(fetchAnalyticsByPeriod(period));
	}, [dispatch, period]);

	useEffect(() => {
		dispatch(fetchAnalyticsRange(periodData));
	}, [dispatch, periodData]);

	useEffect(() => {
		dispatch(fetchAnalyticsPopularService());
	}, [dispatch]);

	const analyticsCards = [
		{
			label: `Выручка (${period === 'day' ? 'день' : period === 'week' ? 'неделя' : period === 'month' ? 'месяц' : 'год'})`,
			value: analyticsByPeriod?.revenue,
			icon: <MonetizationOnIcon color="primary" sx={{ fontSize: 32 }} />,
			suffix: 'сом',
		},
		{
			label: 'Количество заказов',
			value: analyticsByPeriod?.ordersCount,
			icon: <ReceiptLongIcon color="secondary" sx={{ fontSize: 32 }} />,
		},
		{
			label: 'Средний чек',
			value: analyticsByPeriod?.averageCheck,
			icon: <AttachMoneyIcon color="success" sx={{ fontSize: 32 }} />,
			suffix: 'сом',
		},
		{
			label: 'Расходы на склад',
			value: analyticsByPeriod?.warehouseExpenses,
			icon: <Inventory2Icon color="error" sx={{ fontSize: 32 }} />,
			suffix: 'сом',
		},
	];

	return (
		<Box sx={{ width: '100%', py: 3 }}>
			<Box sx={{ mb: 3 }}>
				<ButtonGroup variant="outlined" color="primary">
					{['day', 'week', 'month', 'year'].map(p => (
						<Button
							key={p}
							variant={period === p ? 'contained' : 'outlined'}
							onClick={() => setPeriod(p as typeof period)}
						>
							{p === 'day'
								? 'День'
								: p === 'week'
									? 'Неделя'
									: p === 'month'
										? 'Месяц'
										: 'Год'}
						</Button>
					))}
				</ButtonGroup>
			</Box>

			{!analyticsLoading && analyticsByPeriod && (
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: 2,
						mb: 4,
						justifyContent: 'space-between',
					}}
				>
					{analyticsCards.map(({ label, value, icon, suffix }) => (
						<Paper
							key={label}
							sx={{
								flex: '1 1 240px',
								p: 2,
								minWidth: 220,
								maxWidth: 300,
								boxShadow: 4,
								borderRadius: 3,
								display: 'flex',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<Box>{icon}</Box>
							<Box>
								<Typography variant="subtitle2" color="text.secondary">
									{label}
								</Typography>
								<Typography variant="h6" fontWeight="bold">
									{value?.toLocaleString('ru-RU')} {suffix ?? ''}
								</Typography>
							</Box>
						</Paper>
					))}
				</Box>
			)}

			{/* Блоки с графиками */}
			<Box sx={{ mb: 3 }}>
				<ButtonGroup variant="outlined" color="primary">
					{['month', 'year'].map(p => (
						<Button
							key={`${p}-data`}
							variant={periodData === p ? 'contained' : 'outlined'}
							onClick={() => setPeriodData(p as typeof periodData)}
						>
							{p === 'month' ? 'Месяц' : 'Год'}
						</Button>
					))}
				</ButtonGroup>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 3,
					justifyContent: 'space-between',
				}}
			>
				{analyticsRange && (
					<Paper
						sx={{
							flex: '1 1 600px',
							minWidth: 300,
							height: 320,
							p: 2,
							boxShadow: 3,
							borderRadius: 2,
						}}
					>
						<Typography variant="h6" mb={2}>
							Выручка по{' '}
							{periodData === 'month' ? 'дням месяца' : 'месяцам года'}
						</Typography>
						<ResponsiveContainer width="100%" height="85%">
							<BarChart data={analyticsRange.data}>
								<XAxis dataKey="period" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="revenue" fill="#1976d2" />
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				)}
			</Box>

			<Box sx={{ mt: 3 }}>
				<Paper
					sx={{
						flex: '1 1 300px',
						minWidth: 280,
						height: 320,
						p: 2,
						boxShadow: 3,
						borderRadius: 2,
					}}
				>
					<Typography variant="h6" mb={2}>
						Популярные услуги
					</Typography>
					{analyticsPopular.length > 0 && (
						<ResponsiveContainer width="100%" height="85%">
							<PieChart>
								<Pie
									data={analyticsPopular}
									dataKey="value"
									nameKey="name"
									outerRadius={100}
									fill="#8884d8"
									label
								>
									{analyticsPopular.map((_entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Legend verticalAlign="bottom" height={36} />
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					)}
				</Paper>
			</Box>
		</Box>
	);
}

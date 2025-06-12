import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { selectUser } from '../../../../features/auth/authSlice.ts';
import { selectOrdersCRM } from '../../../../features/orders/orders.slice.ts';
import {
	changeOrderStatus,
	fetchOrdersCRM,
} from '../../../../features/orders/orders.thunks.ts';
import { ROUTES } from '../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../../shared/hooks/useAppSnackbar.tsx';

const statusOptions = [
	'ALL',
	'NEW',
	'IN_PROGRESS',
	'COMPLETED',
	'PAID',
	'CLOSED',
	'CANCELLED',
	'RESCHEDULED',
	'CONFIRMED',
];

type OrderRow = {
	id: string;
	user: {
		name: string;
		email: string;
		phone: string;
	};
	modelCar: {
		name: string;
		brand: {
			name: string;
		};
	};
	carYear: string;
	carColor: string;
	status: string;
	createdAt: string;
};

export function OrdersTableCrm() {
	const dispatch = useAppDispatch();
	const router = useNavigate();
	const { showSnackbar } = useAppSnackbar();
	const user = useAppSelector(selectUser);

	const orders = useAppSelector(selectOrdersCRM);

	const [statusFilter, setStatusFilter] = useState('ALL');
	const [emailFilter, setEmailFilter] = useState('');
	const [nameFilter, setNameFilter] = useState('');

	const columns: GridColDef<OrderRow>[] = [
		{
			field: 'user',
			headerName: 'Клиент',
			flex: 1,
			renderCell: ({ row }) => <span>{row.user.name}</span>,
		},
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
			renderCell: ({ row }) => <span>{row.user.email}</span>,
		},
		{
			field: 'phone',
			headerName: 'Телефон',
			flex: 1,
			renderCell: ({ row }) => <span>{row.user.phone}</span>,
		},
		{
			field: 'car',
			headerName: 'Авто',
			flex: 1.5,
			renderCell: ({ row }) => (
				<p style={{ margin: 0 }}>
					{row.modelCar.brand.name} {row.modelCar.name} {row.carYear}
				</p>
			),
		},
		{ field: 'carColor', headerName: 'Цвет', flex: 1 },
		{
			field: 'status',
			headerName: 'Статус',
			flex: 1.2,
			renderCell: ({ row }) => (
				<FormControl fullWidth size="small">
					<Select
						value={row.status}
						onChange={e => handleStatusChange(row.id, e.target.value)}
					>
						{statusOptions
							.filter(status => status !== 'ALL')
							.map(status => (
								<MenuItem key={status} value={status}>
									{status}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			),
		},
		{
			field: 'createdAt',
			headerName: 'Создан',
			flex: 1.2,
			renderCell: ({ row }) => (
				<span>{new Date(row.createdAt).toLocaleString()}</span>
			),
		},
		{
			field: 'actions',
			headerName: 'Действия',
			flex: 1,
			renderCell: ({ row }) => (
				<Box sx={{ display: 'flex', gap: 1 }}>
					{user?.role === 'ADMIN' && (
						<Tooltip title="Редактировать">
							<IconButton
								onClick={() =>
									router(`${ROUTES.DASHBOARD_ORDER_EDIT}/${row.id}`)
								}
							>
								<EditIcon />
							</IconButton>
						</Tooltip>
					)}
					<Tooltip title="Подробнее">
						<IconButton
							onClick={() => router(`${ROUTES.DASHBOARD_ORDER_INFO}/${row.id}`)}
						>
							<InfoIcon />
						</IconButton>
					</Tooltip>
				</Box>
			),
		},
	];

	const handleStatusChange = async (orderId: string, newStatus: string) => {
		await dispatch(changeOrderStatus({ status: newStatus, id: orderId }));
		showSnackbar('Статус обновлен', 'success');
		dispatch(fetchOrdersCRM());
	};

	const filteredOrders = useMemo(() => {
		return orders.filter(order => {
			return (
				(statusFilter === 'ALL' || order.status === statusFilter) &&
				order.user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
				order.user.name.toLowerCase().includes(nameFilter.toLowerCase())
			);
		});
	}, [statusFilter, emailFilter, nameFilter, orders]);

	return (
		<Box sx={{ width: '100%', p: 2 }}>
			{/* Фильтры */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 2,
					mb: 2,
				}}
			>
				<FormControl size="small" sx={{ minWidth: 150 }}>
					<InputLabel>Статус</InputLabel>
					<Select
						value={statusFilter}
						label="Статус"
						onChange={e => setStatusFilter(e.target.value)}
					>
						{statusOptions.map(status => (
							<MenuItem key={status} value={status}>
								{status}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<TextField
					label="Email"
					value={emailFilter}
					onChange={e => setEmailFilter(e.target.value)}
					size="small"
				/>

				<TextField
					label="Клиент"
					value={nameFilter}
					onChange={e => setNameFilter(e.target.value)}
					size="small"
				/>
			</Box>

			{/* Таблица */}
			<Box sx={{ height: 650, width: '100%' }}>
				<DataGrid<OrderRow>
					rows={filteredOrders}
					columns={columns}
					getRowId={row => row.id}
					pageSizeOptions={[10, 25, 50]}
					initialState={{
						pagination: { paginationModel: { pageSize: 10, page: 0 } },
					}}
					disableRowSelectionOnClick
				/>
			</Box>
		</Box>
	);
}

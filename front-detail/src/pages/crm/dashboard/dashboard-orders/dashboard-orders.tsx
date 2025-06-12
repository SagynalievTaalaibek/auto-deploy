import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { OrdersTableCrm } from '../../../../components/crm/dashboard/orders/orders-table-crm.tsx';
import { LoadingScreen } from '../../../../components/ui/loading-screen/loading-screen.tsx';
import { selectUser } from '../../../../features/auth/authSlice.ts';
import { selectOrdersLoading } from '../../../../features/orders/orders.slice.ts';
import { fetchOrdersCRM } from '../../../../features/orders/orders.thunks.ts';
import { ROUTES } from '../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';

export const DashboardOrders = () => {
	const loading = useAppSelector(selectOrdersLoading);
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	useEffect(() => {
		dispatch(fetchOrdersCRM());
	}, [dispatch]);

	return (
		<Box>
			<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
				Заказы
			</Typography>

			<Button
				variant="contained"
				startIcon={<Add />}
				component={Link}
				to={ROUTES.DASHBOARD_ORDER_ADD}
				sx={{ mb: 2 }}
			>
				Добавить заказ
			</Button>

			{user && user.role === 'MASTER' && (
				<Button
					variant="contained"
					component={Link}
					to={ROUTES.DASHBOARD_ORDER_MY}
					sx={{ marginLeft: 2, mb: 2 }}
				>
					Мои заказы
				</Button>
			)}

			{loading ? <LoadingScreen /> : <OrdersTableCrm />}
		</Box>
	);
};

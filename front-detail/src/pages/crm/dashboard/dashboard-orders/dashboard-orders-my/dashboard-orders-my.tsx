import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { OrdersTableCrm } from '../../../../../components/crm/dashboard/orders/orders-table-crm.tsx';
import { LoadingScreen } from '../../../../../components/ui/loading-screen/loading-screen.tsx';
import { selectUser } from '../../../../../features/auth/authSlice.ts';
import { selectOrdersLoading } from '../../../../../features/orders/orders.slice.ts';
import { fetchOrdersCRM } from '../../../../../features/orders/orders.thunks.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../shared/hooks/hooksStore.ts';

export const DashboardOrdersMy = () => {
	const loading = useAppSelector(selectOrdersLoading);
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	useEffect(() => {
		if (user) {
			dispatch(fetchOrdersCRM(user.id));
		}
	}, [dispatch, user]);

	return (
		<Box>
			<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
				Мои Заказы
			</Typography>

			{loading ? <LoadingScreen /> : <OrdersTableCrm />}
		</Box>
	);
};

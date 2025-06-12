import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { UnifiedOrderForm } from '../../../../../components/commons/order/unified-order-form.tsx';
import DashboardBreadcrumbs from '../../../../../components/ui/dashboard-breadcrumbs.tsx';
import { LoadingScreen } from '../../../../../components/ui/loading-screen/loading-screen.tsx';
import { selectOrdersLoading } from '../../../../../features/orders/orders.slice.ts';
import { fetchOneOrderUpdate } from '../../../../../features/orders/orders.thunks.ts';
import { ROUTES } from '../../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../shared/hooks/hooksStore.ts';

export const DashboardOrdersEdit = () => {
	const { id: orderId } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const loadingOrder = useAppSelector(selectOrdersLoading);

	useEffect(() => {
		if (orderId) {
			dispatch(fetchOneOrderUpdate(orderId));
		}
	}, [dispatch, orderId]);

	return (
		<Box sx={{ p: 3 }}>
			<Box sx={{ mx: 'auto', mt: 4 }}>
				<DashboardBreadcrumbs
					items={[
						{ label: 'Панель управления', href: ROUTES.DASHBOARD },
						{ label: 'Заказы', href: ROUTES.DASHBOARD_ORDER },
						{ label: 'Редактирование заказа' },
					]}
				/>
				<Divider sx={{ my: 2 }} />
				<Typography variant="h5" mb={2}>
					Редактирование заказа
				</Typography>

				{loadingOrder ? (
					<LoadingScreen />
				) : (
					<UnifiedOrderForm mode={'crm'} orderId={orderId} />
				)}
			</Box>
		</Box>
	);
};

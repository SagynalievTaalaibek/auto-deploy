import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { UnifiedOrderForm } from '../../../../../components/commons/order/unified-order-form.tsx';
import DashboardBreadcrumbs from '../../../../../components/ui/dashboard-breadcrumbs.tsx';
import { ROUTES } from '../../../../../shared/constants/constants.ts';

export const DashboardOrdersAdd = () => {
	return (
		<Box sx={{ p: 3 }}>
			<Box sx={{ mx: 'auto', mt: 4 }}>
				<DashboardBreadcrumbs
					items={[
						{ label: 'Панель управления', href: ROUTES.DASHBOARD },
						{ label: 'Заказы', href: ROUTES.DASHBOARD_ORDER },
						{ label: 'Создание заказа' },
					]}
				/>
				<Divider sx={{ my: 2 }} />
				<Typography variant="h5" mb={2}>
					Создание заказа
				</Typography>

				<UnifiedOrderForm mode={'crm'} />
			</Box>
		</Box>
	);
};

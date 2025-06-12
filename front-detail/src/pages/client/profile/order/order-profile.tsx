import { Box, Typography } from '@mui/material';

import { UnifiedOrderForm } from '../../../../components/commons/order/unified-order-form.tsx';

export const OrderProfile = () => {
	return (
		<Box sx={{ marginTop: '74px' }}>
			<Box className="container">
				<Box sx={{ mx: 'auto', mt: 4 }}>
					<Typography variant="h5" sx={{ padding: '15px 0' }}>
						Создание заказа
					</Typography>

					<UnifiedOrderForm mode={'client'} />
				</Box>
			</Box>
		</Box>
	);
};

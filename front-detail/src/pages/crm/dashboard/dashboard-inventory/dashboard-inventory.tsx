import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { InventoryTable } from '../../../../components/crm/dashboard/inventory/inventory-table.tsx';
import { LoadingScreen } from '../../../../components/ui/loading-screen/loading-screen.tsx';
import { selectInventoryLoading } from '../../../../features/inventory/inventory.slice.ts';
import { findAllInventory } from '../../../../features/inventory/inventory.thunks.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';

export const DashboardInventory = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectInventoryLoading);

	useEffect(() => {
		dispatch(findAllInventory());
	}, [dispatch]);

	return (
		<Box>
			<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
				Склад материалов
			</Typography>

			{loading ? <LoadingScreen /> : <InventoryTable />}
		</Box>
	);
};

import { useEffect, useState } from 'react';

import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AddUserModal } from '../../../../components/crm/dashboard/staff/add-user-modal.tsx';
import { UserTable } from '../../../../components/crm/dashboard/staff/user-table.tsx';
import { LoadingScreen } from '../../../../components/ui/loading-screen/loading-screen.tsx';
import { selectUserLoading } from '../../../../features/auth/authSlice.ts';
import { fetchUsersCRM } from '../../../../features/auth/authThunks.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';

export const DashboardStaff = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectUserLoading);

	useEffect(() => {
		dispatch(fetchUsersCRM());
	}, [dispatch]);

	return (
		<Box>
			<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
				Персонал
			</Typography>

			<Button
				variant="contained"
				startIcon={<Add />}
				onClick={() => setOpen(true)}
				sx={{ mb: 2 }}
			>
				Добавить сотрудника
			</Button>

			{loading ? <LoadingScreen /> : <UserTable />}

			<AddUserModal open={open} onCloseModalAction={() => setOpen(false)} />
		</Box>
	);
};

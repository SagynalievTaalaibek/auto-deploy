import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ServicePage } from '../../../../components/crm/dashboard/services/service-page.tsx';
import { LoadingScreen } from '../../../../components/ui/loading-screen/loading-screen.tsx';
import { selectLoadingServices } from '../../../../features/services/services.slice.ts';
import { fetchMainServices } from '../../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';

export const DashboardServices = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectLoadingServices);

	useEffect(() => {
		dispatch(fetchMainServices());
	}, [dispatch]);

	return (
		<Box>
			<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
				Услуги
			</Typography>
			<Button
				variant="contained"
				startIcon={<Add />}
				component={Link}
				to={ROUTES.DASHBOARD_SERVICES_ADD}
				sx={{ my: 2 }}
			>
				Добавить услугу
			</Button>

			{loading ? <LoadingScreen /> : <ServicePage />}
		</Box>
	);
};

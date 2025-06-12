import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Divider } from '@mui/material';
import Box from '@mui/material/Box';

import { ServiceInfoPage } from '../../../../../components/crm/dashboard/services/service-info-page.tsx';
import DashboardBreadcrumbs from '../../../../../components/ui/dashboard-breadcrumbs.tsx';
import { LoadingScreen } from '../../../../../components/ui/loading-screen/loading-screen.tsx';
import {
	selectLoadingServices,
	selectOneMainServices,
} from '../../../../../features/services/services.slice.ts';
import { fetchOneMainServices } from '../../../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../shared/hooks/hooksStore.ts';

export const DashboardServicesInfo = () => {
	const { id: serviceId } = useParams<{ id: string }>();

	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectLoadingServices);
	const oneMainService = useAppSelector(selectOneMainServices);

	useEffect(() => {
		if (serviceId) {
			dispatch(fetchOneMainServices(serviceId));
		}
	}, [dispatch, serviceId]);

	if (loading) return <LoadingScreen />;
	if (!oneMainService) return null;

	return (
		<Box p={4}>
			<DashboardBreadcrumbs
				items={[
					{ label: 'Панель управления', href: ROUTES.DASHBOARD },
					{ label: 'Услуги', href: ROUTES.DASHBOARD_SERVICES },
					{ label: 'Информация по услуге' },
				]}
			/>

			<Divider />
			<ServiceInfoPage
				mainId={serviceId ? serviceId : ''}
				name={oneMainService.name}
				img={oneMainService.img}
				description={oneMainService.description}
				services={oneMainService.services}
			/>
		</Box>
	);
};

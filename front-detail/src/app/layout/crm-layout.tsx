import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import { LoadingScreen } from '../../components/ui/loading-screen/loading-screen.tsx';
import { selectUser } from '../../features/auth/authSlice.ts';
import { getNavigationByRole } from '../../shared/constants/navigations.tsx';
import { useAppSelector } from '../../shared/hooks/hooksStore.ts';
import theme from '../../shared/theme/theme.ts';

const CrmLayout = () => {
	const user = useAppSelector(selectUser);

	if (!user) return <LoadingScreen />;

	const navigation = getNavigationByRole(user.role);

	return (
		<AppProvider
			branding={{
				logo: '',
				title: 'DETAILING KG',
				homeUrl: '/dashboard',
			}}
			navigation={navigation}
			theme={theme}
		>
			<DashboardLayout>
				<Box sx={{ flexGrow: 1, p: 3 }}>
					<Outlet />
				</Box>
			</DashboardLayout>
		</AppProvider>
	);
};

export default CrmLayout;

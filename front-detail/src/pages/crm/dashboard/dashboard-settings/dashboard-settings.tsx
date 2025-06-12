import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SettingsPage } from '../../../../components/crm/dashboard/settings/settings-page.tsx';
import { LoadingScreen } from '../../../../components/ui/loading-screen/loading-screen.tsx';

export const DashboardSettings = () => {
	const loading = false;

	return (
		<Box>
			<Box>
				<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
					Настройка
				</Typography>

				{loading ? <LoadingScreen /> : <SettingsPage />}
			</Box>
		</Box>
	);
};

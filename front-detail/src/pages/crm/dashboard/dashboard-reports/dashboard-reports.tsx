import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ReportsPage } from '../../../../components/crm/dashboard/reports/reports-page.tsx';
import { LoadingScreen } from '../../../../components/ui/loading-screen/loading-screen.tsx';

export const DashboardReports = () => {
	const loading = false;

	return (
		<Box>
			<Box>
				<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
					📊 Системные отчеты
				</Typography>

				{loading ? <LoadingScreen /> : <ReportsPage />}
			</Box>
		</Box>
	);
};

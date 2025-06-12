import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AnalyticsPage } from '../../../../components/crm/dashboard/analytics/analytics-page.tsx';

export const DashboardAnalytics = () => {
	return (
		<Box>
			<Box>
				<Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
					Аналитика бизнеса
				</Typography>

				<AnalyticsPage />
			</Box>
		</Box>
	);
};

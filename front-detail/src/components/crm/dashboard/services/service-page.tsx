import { useNavigate } from 'react-router-dom';

import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';

import { selectMainServices } from '../../../../features/services/services.slice.ts';
import { ROUTES } from '../../../../shared/constants/constants.ts';
import { useAppSelector } from '../../../../shared/hooks/hooksStore.ts';

export const ServicePage = () => {
	const mainServices = useAppSelector(selectMainServices);
	const navigate = useNavigate();

	return (
		<Box sx={{ py: 2 }}>
			<Typography variant="h4" mb={4}>
				Список основных услуг
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 4,
				}}
			>
				{mainServices.map(item => (
					<Box
						key={item.id}
						sx={{
							width: '100%',
							maxWidth: '360px',
							flex: '1 1 300px',
						}}
					>
						<Card
							sx={{
								borderRadius: 4,
								boxShadow: 3,
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<CardMedia
								component="img"
								height="180"
								image={item.img}
								alt={item.name}
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography variant="h6" component="div" gutterBottom>
									{item.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{item.description}
								</Typography>
							</CardContent>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									p: 2,
								}}
							>
								<Button
									variant="outlined"
									onClick={() =>
										navigate(
											`${ROUTES.DASHBOARD_SERVICES_MAIN_EDIT}/${item.id}`,
										)
									}
								>
									Редактировать
								</Button>
								<Button
									variant="contained"
									color="secondary"
									onClick={() =>
										navigate(`${ROUTES.DASHBOARD_SERVICES_INFO}/${item.id}`)
									}
								>
									Подробнее
								</Button>
							</Box>
						</Card>
					</Box>
				))}
			</Box>
		</Box>
	);
};

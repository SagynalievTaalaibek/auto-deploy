import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from '@mui/material';

import {
	deleteService,
	fetchOneMainServices,
} from '../../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../../shared/constants/constants.ts';
import { useAppDispatch } from '../../../../shared/hooks/hooksStore.ts';
import type { IService } from '../../../../shared/types/services.ts';

interface ServiceInfoPageProps {
	mainId: string;
	name: string;
	description?: string;
	img?: string;
	services: IService[];
}

export const ServiceInfoPage = ({
	mainId,
	name,
	description,
	img,
	services,
}: ServiceInfoPageProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [openConfirm, setOpenConfirm] = useState(false);
	const [serviceToDelete, setServiceToDelete] = useState<IService | null>(null);

	const handleDeleteClick = (service: IService) => {
		setServiceToDelete(service);
		setOpenConfirm(true);
	};

	const handleConfirmDelete = async () => {
		if (serviceToDelete) {
			await dispatch(deleteService(serviceToDelete.id));
			dispatch(fetchOneMainServices(mainId));
		}
		setOpenConfirm(false);
		setServiceToDelete(null);
	};

	return (
		<Box sx={{ mt: 2 }}>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'row',
					mb: 4,
					borderRadius: 3,
					boxShadow: 2,
				}}
			>
				<CardMedia
					component="img"
					image={img}
					alt={name}
					sx={{
						width: 280,
						height: '100%',
						objectFit: 'cover',
						borderRadius: '12px 0 0 12px',
					}}
				/>
				<CardContent sx={{ flex: 1 }}>
					<Typography variant="h5" mb={2}>
						{name}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
			</Card>

			<Typography variant="h6" mb={2}>
				Детальные услуги
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				{services.map(service => (
					<Box
						key={service.id}
						sx={{
							border: '1px solid #e0e0e0',
							borderRadius: 2,
							p: 2,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							boxShadow: 1,
							bgcolor: 'background.paper',
						}}
					>
						<Box>
							<Typography variant="subtitle1">{service.name}</Typography>
							<Typography variant="body2" color="text.secondary" mb={0.5}>
								{service.description}
							</Typography>
							<Typography variant="caption" color="text.secondary">
								Цена: {service.basePriceMin} – {service.basePriceMax} сом
							</Typography>
						</Box>

						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button
								variant="outlined"
								color="primary"
								onClick={() =>
									navigate(
										`${ROUTES.DASHBOARD_SERVICES_SUB_EDIT}/${service.id}`,
									)
								}
							>
								Редактировать
							</Button>
							<Button
								variant="outlined"
								color="error"
								onClick={() => handleDeleteClick(service)}
							>
								Удалить
							</Button>
						</Box>
					</Box>
				))}
			</Box>

			<Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
				<DialogTitle>Подтвердите удаление</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Вы действительно хотите удалить услугу{' '}
						<strong>{serviceToDelete?.name}</strong>? Это действие необратимо.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenConfirm(false)} color="inherit">
						Отмена
					</Button>
					<Button
						onClick={handleConfirmDelete}
						color="error"
						variant="contained"
					>
						Удалить
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

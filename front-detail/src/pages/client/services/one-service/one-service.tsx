import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { selectOneMainServices } from '../../../../features/services/services.slice.ts';
import { fetchOneMainServices } from '../../../../features/services/services.thunks.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';

export const OneService = () => {
	const dispatch = useAppDispatch();
	const { id: serviceId } = useParams<{ id: string }>();
	const service = useAppSelector(selectOneMainServices);

	useEffect(() => {
		if (serviceId) {
			dispatch(fetchOneMainServices(serviceId));
		}
	}, [dispatch, serviceId]);

	if (!service) {
		return (
			<Box sx={{ mt: '70px', textAlign: 'center' }}>
				<Typography variant="h6">Загрузка...</Typography>
			</Box>
		);
	}

	return (
		<Box className={'container'}>
			<Box sx={{ mt: '70px', px: 3, pb: 5 }}>
				{/* Заголовок */}
				<Typography variant="h4" fontWeight="bold" pt={3} mb={3}>
					{service.name}
				</Typography>

				{/* Обертка для изображения и описания */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: 3,
						alignItems: { xs: 'center', md: 'flex-start' },
						mb: 4,
					}}
				>
					{/* Картинка */}
					<Box
						component="img"
						src={service.img}
						alt={service.name}
						sx={{
							width: { xs: '100%', sm: 350, md: 400 },
							height: 'auto',
							objectFit: 'cover',
							borderRadius: 3,
							boxShadow: 3,
						}}
					/>

					{/* Описание */}
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ flex: 1, mt: { xs: 2, md: 0 } }}
					>
						{service.description}
					</Typography>
				</Box>

				<Divider sx={{ mb: 3 }} />

				{/* Список подуслуг */}
				<Typography variant="h5" fontWeight="medium" mb={2}>
					Услуги:
				</Typography>

				<Box>
					{service.services.map(sub => (
						<Box
							key={sub.id}
							sx={{
								mb: 2,
								p: 2,
								border: '1px solid #e0e0e0',
								borderRadius: 2,
								boxShadow: 1,
								backgroundColor: '#fafafa',
							}}
						>
							<Typography variant="h6" fontWeight="medium">
								{sub.name}
							</Typography>
							<Typography variant="body2" color="text.secondary" mb={1}>
								{sub.description}
							</Typography>
							<Typography variant="body2">
								Цена: от {sub.basePriceMin} до {sub.basePriceMax} сом
							</Typography>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

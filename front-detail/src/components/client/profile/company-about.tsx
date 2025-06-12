import { Link } from 'react-router-dom';

import { Build, Email, LocationOn, Phone } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	Stack,
	Typography,
} from '@mui/material';

import { ROUTES } from '../../../shared/constants/constants.ts';

export function CompanyAbout() {
	return (
		<Box sx={{ mt: 2 }}>
			<Card sx={{ p: 3 }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: 4,
					}}
				>
					{/* Левая колонка */}
					<Box
						sx={{
							flex: '0 0 auto',
							width: { xs: '100%', md: '30%' },
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 2,
						}}
					>
						<Box
							sx={{
								width: 180,
								height: 180,
								borderRadius: '50%',
								overflow: 'hidden',
							}}
						>
							<img
								src="/logo.png"
								alt="Логотип"
								width={180}
								height={180}
								style={{ objectFit: 'cover' }}
							/>
						</Box>
						<Typography variant="h6">Detailing Center</Typography>
						<Stack direction="row" spacing={1} alignItems="center">
							<Phone fontSize="small" />
							<Typography variant="body2">+996 700 123 456</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<Email fontSize="small" />
							<Typography variant="body2">contact@detailing.kg</Typography>
						</Stack>
						<Stack direction="row" spacing={1} alignItems="center">
							<LocationOn fontSize="small" />
							<Typography variant="body2">
								Бишкек, ул. Тоголок Молдо 25
							</Typography>
						</Stack>
					</Box>

					{/* Правая колонка */}
					<Box sx={{ flex: 1 }}>
						<CardContent sx={{ p: 0 }}>
							<Typography variant="h5" gutterBottom>
								О компании
							</Typography>
							<Typography variant="body2" color="text.secondary" mb={2}>
								Мы специализируемся на профессиональном детейлинге автомобилей,
								включая полировку, оклейку пленкой, тонирование, химчистку и
								защитные покрытия.
							</Typography>

							<Divider sx={{ my: 2 }} />

							<Typography variant="h6" gutterBottom>
								Услуги
							</Typography>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
								{[
									'Полировка',
									'Тонирование стекол',
									'Оклейка полиуретаном',
									'Оклейка винилом',
									'Оклейка салона',
									'Химчистка',
									'Ремонт салона',
									'Кузовной ремонт',
								].map(service => (
									<Chip
										key={service}
										label={service}
										color="primary"
										variant="outlined"
										icon={<Build fontSize="small" />}
									/>
								))}
							</Box>
							<Divider sx={{ my: 2 }} />
							<Link to={ROUTES.PROFILE_ORDER}>
								<Button variant="contained" color="primary" fullWidth>
									Забронировать услугу
								</Button>
							</Link>
						</CardContent>
					</Box>
				</Box>
			</Card>
		</Box>
	);
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
	AccessTime,
	Email,
	Instagram,
	LocationOn,
	Phone,
	Telegram,
	WhatsApp,
} from '@mui/icons-material';
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { FormQuestion } from '../../../components/client/form-question/form-question.tsx';
import { LoadingScreen } from '../../../components/ui/loading-screen/loading-screen.tsx';
import {
	selectContactsInfo,
	selectLoadingSettings,
} from '../../../features/settings/settings.slice.ts';
import { fetchContactInfo } from '../../../features/settings/settings.thunks.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/hooks/hooksStore.ts';

const iconMap = {
	telegram: Telegram,
	whatsapp: WhatsApp,
	instagram: Instagram,
};

export const Contacts = () => {
	const dispatch = useAppDispatch();
	const contacts = useAppSelector(selectContactsInfo);
	const loading = useAppSelector(selectLoadingSettings);

	const [open, setOpen] = useState(false);

	const socialItems = [
		{ platform: 'telegram', url: contacts?.telegramUrl },
		{ platform: 'whatsapp', url: contacts?.whatsappUrl },
		{ platform: 'instagram', url: contacts?.instagramUrl },
	].filter(item => !!item.url);

	useEffect(() => {
		dispatch(fetchContactInfo());
	}, [dispatch]);

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<Box
			sx={{
				py: 8,
				backgroundColor: '#000',
				color: '#fff',
				minHeight: '100vh',
			}}
		>
			<Box className="container" sx={{ textAlign: 'center' }}>
				<Typography
					variant="h3"
					component="h1"
					gutterBottom
					sx={{
						color: '#FFD700',
						fontWeight: 'bold',
						mb: 2,
						mt: 4,
					}}
				>
					{contacts?.title ?? 'Контакты'}
				</Typography>

				<Divider
					sx={{
						backgroundColor: '#FFD700',
						height: 3,
						margin: '0 auto 40px auto',
						borderRadius: 5,
					}}
				/>

				<Typography variant="h6" sx={{ mb: 5 }}>
					{contacts?.subTitle ?? ''}
				</Typography>

				<Button
					variant="contained"
					sx={{
						color: 'black',
						px: 3,
						py: 1.5,
						backgroundColor: '#FFD700',
						'&:hover': { fontWeight: 600 },
					}}
					onClick={() => setOpen(true)}
				>
					Задать вопрос
				</Button>

				<Box
					component="section"
					sx={{
						px: { xs: 2, md: 6 },
						py: 8,
						mx: 'auto',
						backgroundColor: '#000',
						color: '#fff',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							flexWrap: 'wrap',
							gap: 4,
						}}
					>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
							{contacts?.address && (
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<LocationOn sx={{ color: '#FFD700' }} />
									<Typography ml={1}>{contacts.address}</Typography>
								</Box>
							)}

							{contacts?.phone && (
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Phone sx={{ color: '#FFD700' }} />
									<Typography
										ml={1}
										component={Link}
										to={`tel:${contacts.phone}`}
										sx={{ color: '#fff', textDecoration: 'none' }}
									>
										{contacts.phone}
									</Typography>
								</Box>
							)}

							{contacts?.email && (
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Email sx={{ color: '#FFD700' }} />
									<Typography
										ml={1}
										component={Link}
										to={`mailto:${contacts.email}`}
										sx={{ color: '#fff', textDecoration: 'none' }}
									>
										{contacts.email}
									</Typography>
								</Box>
							)}

							{contacts?.workingHours && (
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<AccessTime sx={{ color: '#FFD700' }} />
									<Typography ml={1}>{contacts.workingHours}</Typography>
								</Box>
							)}
						</Box>

						<Box
							sx={{
								width: 180,
								height: 180,
								borderRadius: '50%',
								overflow: 'hidden',
								display: { xs: 'none', md: 'block' },
								border: '3px solid #FFD700',
							}}
						>
							<img
								src={'/logo.png'}
								alt={'detail logo'}
								width={180}
								height={180}
								style={{ objectFit: 'cover' }}
							/>
						</Box>
					</Box>
				</Box>

				{/* Соцсети */}
				<Box
					sx={{
						mt: 5,
						display: 'flex',
						flexWrap: 'wrap',
						gap: 2,
						justifyContent: { xs: 'flex-start', md: 'center' },
					}}
				>
					{socialItems.map((item, idx) => {
						const Icon = iconMap[item.platform as keyof typeof iconMap];
						return (
							<Link
								key={`${idx}-social`}
								to={item.url!}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Box
									sx={{
										width: 40,
										height: 40,
										borderRadius: '50%',
										bgcolor: '#FFD700',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										transition: 'transform 0.3s',
										color: '#000',
										'&:hover': {
											transform: 'scale(1.1)',
											bgcolor: '#FFC107',
										},
									}}
								>
									<Icon fontSize="medium" />
								</Box>
							</Link>
						);
					})}
				</Box>

				{/* Карта */}
				{contacts?.mapUrl && (
					<Box sx={{ my: 5 }}>
						<Box
							component="iframe"
							src={contacts.mapUrl}
							width="100%"
							height={450}
							sx={{ border: 0 }}
							loading="lazy"
						/>
					</Box>
				)}
			</Box>

			<FormQuestion open={open} setOpen={setOpen} />
		</Box>
	);
};

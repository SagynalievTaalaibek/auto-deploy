import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography, useTheme } from '@mui/material';

import { ROUTES } from '../../../shared/constants/constants.ts';
import { FormQuestion } from '../form-question/form-question.tsx';

interface StartScreenProps {
	main_title: string;
	second_text: string;
	description: string;
}

export function StartScreen({
	main_title,
	second_text,
	description,
}: StartScreenProps) {
	const theme = useTheme();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	return (
		<Box
			sx={{
				background: `url(car_big.jpg) no-repeat center center fixed`,
				backgroundSize: 'cover',
				minHeight: '100vh',
				width: '100%',
			}}
		>
			<div className="container">
				<Box>
					<Box sx={{ mb: 4, paddingTop: '200px' }}>
						<Typography
							variant="h2"
							component="h1"
							sx={{
								fontWeight: 700,
								fontSize: { xs: '2rem', md: '3rem' },
								color: '#FFD700',
								lineHeight: 1.2,
							}}
						>
							{main_title}
						</Typography>

						<Typography
							variant="h2"
							component="h2"
							sx={{
								fontWeight: 700,
								fontSize: { xs: '2rem', md: '3rem' },
								color: 'white',
								lineHeight: 1.2,
								mb: 2,
							}}
						>
							{second_text}
						</Typography>

						<Typography
							variant="body1"
							sx={{
								fontSize: { xs: '1rem', md: '1.125rem' },
								color: 'white',
								maxWidth: '500px',
								fontWeight: 600,
							}}
						>
							{description}
						</Typography>
					</Box>

					<Box sx={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
						<Button
							variant="contained"
							sx={{
								color: 'black',
								px: 3,
								py: 1.5,
								backgroundColor: theme.palette.primary.main,
								'&:hover': { fontWeight: 600 },
							}}
							onClick={() => navigate(ROUTES.PROFILE)}
						>
							Записаться
						</Button>

						<Button
							variant="contained"
							sx={{
								color: 'white',
								px: 3,
								py: 1.5,
								backgroundColor: theme.palette.primary.dark,
								'&:hover': { fontWeight: 600 },
							}}
							onClick={() => setOpen(true)}
						>
							Задать вопрос
						</Button>
					</Box>
				</Box>
			</div>

			<FormQuestion open={open} setOpen={setOpen} />
		</Box>
	);
}

import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ROUTES } from '../../../shared/constants/constants.ts';

interface Props {
	id: string;
	name: string;
	img: string;
	description: string;
	services: {
		id: string;
		name: string;
		categoryId: string;
	}[];
	index: number;
}

export const ServiceItem = (props: Props) => {
	const isEven = props.index % 2 === 0;
	const backgroundColor = isEven ? '#111' : '#fff';
	const textColor = isEven ? '#fff' : '#111';

	const navigate = useNavigate();

	return (
		<div>
			<Box
				sx={{
					backgroundColor: backgroundColor,
					color: textColor,
					px: { xs: 2, md: 6 },
					py: { xs: 4, md: 8 },
				}}
			>
				<Box
					className="container"
					sx={{
						maxWidth: '1200px',
						mx: 'auto',
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 6,
					}}
				>
					{/* Левая часть - текст */}
					<Box sx={{ flex: '1 1 60%' }}>
						<Typography
							variant="h3"
							sx={{
								color: '#FF7C5D',
								fontWeight: 700,
								fontSize: { xs: '2rem', md: '2.5rem' },
								mb: 2,
							}}
						>
							{props.name}
						</Typography>

						<Typography
							variant="body1"
							sx={{
								fontSize: '1rem',
								lineHeight: 1.6,
								color: textColor,
								mb: 4,
							}}
						>
							{props.description}
						</Typography>

						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
							{props.services.map(text => (
								<Button
									key={text.id}
									variant="contained"
									sx={{
										backgroundColor: '#FF7C5D',
										color: '#fff',
										borderRadius: 2,
										px: 3,
										py: 1.2,
										fontSize: '0.875rem',
										fontWeight: 600,
										textTransform: 'uppercase',
										'&:hover': {
											backgroundColor: '#e86449',
										},
									}}
									onClick={() =>
										navigate(`${ROUTES.SERVICES_CLIENT}/${text.categoryId}`)
									}
								>
									{text.name}
								</Button>
							))}
						</Box>
					</Box>

					{/* Правая часть — изображение (если нужно) */}
					<Box
						sx={{
							display: { xs: 'none', md: 'block' },
							width: '100%',
							maxWidth: '400px',
							borderRadius: 3,
							boxShadow: 4,
							flex: '1 1 40%',
							overflow: 'hidden',
						}}
					>
						<Box sx={{ width: '100%' }}>
							<img src={props.img} alt={props.name} width={440} height={340} />
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
};

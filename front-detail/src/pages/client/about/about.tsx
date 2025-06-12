import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const About = () => {
	return (
		<Box
			sx={{
				backgroundColor: '#000',
				color: '#fff',
				minHeight: '100vh',
				py: 8,
			}}
		>
			<Box className={'container'}>
				<Typography
					variant="h3"
					component="h1"
					gutterBottom
					sx={{
						textAlign: 'center',
						fontWeight: 'bold',
						color: '#FFD700', // Золотой цвет
						mt: 4,
						mb: 4,
					}}
				>
					О нас
				</Typography>

				<Divider
					sx={{
						backgroundColor: '#FFD700',
						height: 3,
						margin: '0 auto 40px auto',
						borderRadius: 5,
					}}
				/>

				<Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
					Мы — команда энтузиастов, превративших любовь к автомобилям в
					профессию. Наш детейлинг-центр — это место, где каждый автомобиль
					получает индивидуальный уход, профессиональную чистку, восстановление
					и защиту.
				</Typography>

				<Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
					Наша миссия — дарить автомобилям вторую жизнь, возвращать им блеск и
					подчёркивать их уникальность. Мы используем только проверенные
					материалы, передовые технологии и бережный подход к каждой детали.
				</Typography>

				<Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
					Нам доверяют владельцы как повседневных авто, так и эксклюзивных
					моделей. В нашем центре ценят качество, ответственность и внимание к
					деталям.
				</Typography>

				<Typography variant="h6" gutterBottom>
					Приезжайте и убедитесь сами — ваш автомобиль заслуживает лучшего!
				</Typography>
			</Box>
		</Box>
	);
};

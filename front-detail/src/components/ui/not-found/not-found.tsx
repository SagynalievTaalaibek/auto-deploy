import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NotFound = () => {
	return (
		<div>
			<Box sx={{ mt: 5, textAlign: 'center', fontWeight: '700' }}>
				<Typography sx={{ fontWeight: '700' }} variant="h2">
					404 - Page Not Found
				</Typography>
				<Typography sx={{ fontSize: '20px' }}>
					The page you are looking for does not exist.
				</Typography>
				<p></p>
			</Box>
		</div>
	);
};

export default NotFound;

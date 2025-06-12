import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import { Navigation } from './Navigation.tsx';

export function Header() {
	const theme = useTheme();

	return (
		<Box
			component="header"
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				borderBottom: '2px solid rgba(0, 0, 0, 0.25)',
				backgroundColor: theme.palette.primary.main,
				zIndex: 1000,
				textAlign: 'center',
			}}
		>
			<div className={'container'}>
				<Navigation />
			</div>
		</Box>
	);
}

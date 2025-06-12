import React from 'react';

import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material';

interface AuthLayoutProps {
	form: React.ReactNode;
	title: React.ReactNode;
	description: React.ReactNode;
	footerText: React.ReactNode;
}

export function AuthLayout({
	form,
	title,
	description,
	footerText,
}: AuthLayoutProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Card sx={{ width: '100%', maxWidth: 400 }}>
				<CardHeader
					title={
						<Typography variant="h5" component="div">
							{title}
						</Typography>
					}
					subheader={
						<Typography variant="body2" color="text.secondary">
							{description}
						</Typography>
					}
				/>
				<CardContent>{form}</CardContent>
				<CardActions>
					<Box
						sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
					>
						<Typography variant="body2" color="text.secondary">
							{footerText}
						</Typography>
					</Box>
				</CardActions>
			</Card>
		</Box>
	);
}

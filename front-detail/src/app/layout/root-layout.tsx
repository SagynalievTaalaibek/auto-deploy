import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import theme from '../../shared/theme/theme.ts';
import { persistor, store } from '../store/store.ts';

const RootLayout = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					autoHideDuration={3000}
				>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Outlet />
					</ThemeProvider>
				</SnackbarProvider>
			</PersistGate>
		</Provider>
	);
};

export default RootLayout;

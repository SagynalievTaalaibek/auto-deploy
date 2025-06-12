import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#ffb818',
			light: '#63a4ff',
			dark: '#000000',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#000000',
			light: '#d05ce3',
			dark: '#6a0080',
			contrastText: '#ffffff',
		},
		error: {
			main: '#d32f2f',
		},
		warning: {
			main: '#ffa000',
		},
		info: {
			main: '#0288d1',
		},
		success: {
			main: '#2e7d32',
		},
		background: {
			default: '#f4f6f8',
			paper: '#ffffff',
		},
		text: {
			primary: '#212121', // Основной цвет текста
			secondary: '#757575', // Вторичный цвет текста
			disabled: '#bdbdbd', // Цвет текста для неактивных элементов
		},
	},
	typography: {
		fontFamily: 'Montserrat, sans-serif',
		fontSize: 16,
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 700,
		},
		h3: {
			fontSize: '1.75rem',
			fontWeight: 500,
		},
		button: {
			textTransform: 'none', // Отключить capslock на кнопках
		},
	},
	components: {
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
				fullWidth: true,
			},
			styleOverrides: {
				root: {
					margin: '8px 0', // Отступы вокруг текстового поля
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '8px', // Скругление углов кнопок
					textTransform: 'none', // Отключение капс-текста
				},
				contained: {
					boxShadow: 'none', // Убираем тень у кнопок
					'&:hover': {
						boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Тень при наведении
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: '12px', // Скругление углов для карточек
				},
			},
		},
	},
});

export default theme;

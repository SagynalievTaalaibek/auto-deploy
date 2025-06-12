import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { type SnackbarKey, type VariantType, useSnackbar } from 'notistack';

export const useAppSnackbar = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const showSnackbar = (
		message: string,
		variant: VariantType = 'default',
		time?: number,
	) => {
		enqueueSnackbar(message, {
			variant,
			action: (key: SnackbarKey) => (
				<IconButton
					onClick={() => closeSnackbar(key)}
					color="inherit"
					size="small"
				>
					<CloseIcon />
				</IconButton>
			),
			autoHideDuration: time ? time : 3000,
		});
	};

	return { showSnackbar };
};

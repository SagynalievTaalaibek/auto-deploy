import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, CircularProgress, TextField } from '@mui/material';

import { loginUser } from '../../../features/auth/authThunks.ts';
import { ROUTES } from '../../../shared/constants/constants.ts';
import { useAppDispatch } from '../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../shared/hooks/useAppSnackbar.tsx';
import { LoginSchema, type TypeLoginSchema } from '../../../shared/schemas';

export function LoginForm() {
	const dispatch = useAppDispatch();
	const router = useNavigate();
	const { showSnackbar } = useAppSnackbar();

	const [values, setValues] = useState<TypeLoginSchema>({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);
	const [isPending, setIsPending] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: undefined });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = LoginSchema.safeParse(values);

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			result.error.errors.forEach(err => {
				if (err.path[0]) fieldErrors[err.path[0]] = err.message;
			});
			setErrors(fieldErrors);
			return;
		}

		setIsPending(true);

		try {
			await dispatch(loginUser(values)).unwrap();
			showSnackbar('Вы успешно вошли!', 'success');
			setErrors({});
			router(ROUTES.PROFILE);
		} catch (err) {
			console.log(err);
			showSnackbar('Неверный email или пароль', 'error');
			setErrors({ email: 'Неверный email или пароль' });
		}
		setIsPending(false);
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			display="flex"
			flexDirection="column"
			gap={2}
		>
			<TextField
				label="Email"
				name="email"
				value={values.email}
				onChange={handleChange}
				error={!!errors.email}
				helperText={errors.email}
				fullWidth
			/>

			<TextField
				label="Пароль"
				name="password"
				type="password"
				value={values.password}
				onChange={handleChange}
				error={!!errors.password}
				helperText={errors.password}
				fullWidth
				placeholder="******"
			/>

			<Button
				variant="contained"
				type="submit"
				disabled={isPending}
				fullWidth
				sx={{ mt: 1 }}
			>
				{isPending ? <CircularProgress size={24} color="inherit" /> : 'Войти'}
			</Button>
		</Box>
	);
}

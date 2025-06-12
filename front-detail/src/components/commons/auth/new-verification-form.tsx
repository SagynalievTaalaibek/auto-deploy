'use client';

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import { verifyEmail } from '../../../features/auth/authThunks.ts';
import { ROUTES } from '../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../shared/hooks/useAppSnackbar.tsx';

import { AuthLayout } from './auth-layout.tsx';

export function NewVerificationForm() {
	const dispatch = useAppDispatch();
	const router = useNavigate();
	const { showSnackbar } = useAppSnackbar();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const { error, user } = useAppSelector(state => state.auth);

	useEffect(() => {
		if (token) {
			dispatch(verifyEmail(token));
		}
	}, [token, dispatch]);

	useEffect(() => {
		if (user) {
			showSnackbar('Почта успешно подтверждена', 'success');
			router(ROUTES.PROFILE);
		}
	}, [user]);

	useEffect(() => {
		if (error) {
			showSnackbar(error, 'error');
			router(ROUTES.LOGIN);
		}
	}, [error]);

	return (
		<AuthLayout
			form={
				<div>
					<CircularProgress />
				</div>
			}
			title={'Подтверждение почты'}
			description={''}
			footerText={''}
		/>
	);
}

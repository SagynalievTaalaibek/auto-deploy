import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../../features/auth/authThunks.ts';
import { ROUTES } from '../../../shared/constants/constants.ts';
import { useAppDispatch } from '../../../shared/hooks/hooksStore.ts';

export function Logout() {
	const dispatch = useAppDispatch();
	const router = useNavigate();

	useEffect(() => {
		dispatch(logoutUser());
		router(ROUTES.LOGIN);
	}, [dispatch, router]);

	return null;
}

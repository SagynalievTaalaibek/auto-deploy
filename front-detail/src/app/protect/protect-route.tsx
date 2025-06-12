import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { LoadingScreen } from '../../components/ui/loading-screen/loading-screen.tsx';
import { selectUser } from '../../features/auth/authSlice.ts';
import { fetchUser } from '../../features/auth/authThunks.ts';
import { ROUTES } from '../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../shared/hooks/hooksStore.ts';

interface ProtectedRouteProps extends React.PropsWithChildren {
	roles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	roles = [],
	children,
}) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	useEffect(() => {
		if (!user) {
			dispatch(fetchUser());
		}
	}, [user, dispatch]);

	if (user === undefined) {
		return <LoadingScreen />;
	}

	if (!user) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	if (roles.length > 0 && !roles.includes(user.role)) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return children;
};

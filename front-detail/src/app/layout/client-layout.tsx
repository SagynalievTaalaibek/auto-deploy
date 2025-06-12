import { Outlet } from 'react-router-dom';

import { Header } from '../../components/ui/header/header.tsx';

const ClientLayout = () => {
	/*const role = useSelector((state: RootState) => state.auth.user?.role);

	// Если пользователь — админ, отправим его в админку
	if (role === 'admin') {
		return <Navigate to="/admin" replace />;
	}*/

	return (
		<div>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default ClientLayout;

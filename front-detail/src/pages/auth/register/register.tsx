import { Link } from 'react-router-dom';

import { AuthLayout } from '../../../components/commons/auth/auth-layout.tsx';
import { RegisterForm } from '../../../components/commons/auth/register-form.tsx';
import { ROUTES } from '../../../shared/constants/constants.ts';

export function Register() {
	return (
		<AuthLayout
			title="Регистрация"
			description="Чтобы войти на сайт введите ваш email и пароль"
			form={<RegisterForm />}
			footerText={
				<>
					Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
				</>
			}
		/>
	);
}

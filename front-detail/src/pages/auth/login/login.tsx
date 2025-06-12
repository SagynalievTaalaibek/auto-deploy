import { Link } from 'react-router-dom';

import { AuthLayout } from '../../../components/commons/auth/auth-layout.tsx';
import { LoginForm } from '../../../components/commons/auth/login-form.tsx';
import { ROUTES } from '../../../shared/constants/constants.ts';

export function Login() {
	return (
		<AuthLayout
			title="Вход в систему"
			description="Введите ваш email и пароль для входа в систему"
			form={<LoginForm />}
			footerText={
				<>
					Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
				</>
			}
		/>
	);
}

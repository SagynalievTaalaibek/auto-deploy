import { z } from 'zod';

export const RegisterSchema = z
	.object({
		name: z.string().min(1, 'Имя обязательно'),
		email: z.string().email('Неверный email'),
		phone: z
			.string()
			.min(10, 'Номер телефона слишком короткий')
			.max(15, 'Номер телефона слишком длинный')
			.regex(/^\+?[0-9]+$/, 'Неверный формат номера'),
		password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
		passwordRepeat: z.string().min(6, 'Повторите пароль'),
	})
	.refine(data => data.password === data.passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['passwordRepeat'],
	});

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;

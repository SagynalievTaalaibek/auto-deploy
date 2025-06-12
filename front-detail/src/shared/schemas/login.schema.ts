import { z } from 'zod';

export const LoginSchema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email('Неверный email'),
	password: z
		.string({ required_error: 'Пароль обязателен' })
		.min(6, 'Пароль должен быть не менее 6 символов'),
});

export type TypeLoginSchema = z.infer<typeof LoginSchema>;

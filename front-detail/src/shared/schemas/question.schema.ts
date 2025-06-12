import { z } from 'zod';

export const QuestionSchema = z.object({
	name: z.string().min(1, 'Имя обязательно'),
	phone: z
		.string()
		.min(9, 'Минимум 9 символов')
		.regex(/^\+?[0-9\s\-()]+$/, 'Неверный номер'),
	question: z.string().min(5, 'Минимум 5 символов'),
});

export type TypeQuestionSchema = z.infer<typeof QuestionSchema>;

import { z } from 'zod';

export const ServiceAddSchema = z.object({
	name: z.string().min(1, 'Название обязательно'),
	categoryId: z.string().uuid('Некорректный UUID'),
	description: z.string().min(1, 'Описание обязательно'),
	basePriceMin: z.number().nonnegative('Цена не может быть отрицательной'),
	basePriceMax: z.number().nonnegative('Цена не может быть отрицательной'),
});

export type TypeServiceAddSchema = z.infer<typeof ServiceAddSchema>;

import { z } from 'zod';

export const ServiceServiceEditSchema = z.object({
	name: z.string().min(1, 'Название обязательно'),
	categoryId: z.string().uuid('Некорректный UUID'),
	description: z.string().min(1, 'Описание обязательно'),
	basePriceMin: z.number().nonnegative('Цена не может быть отрицательной'),
	basePriceMax: z.number().nonnegative('Цена не может быть отрицательной'),
});

export type TypeServiceServiceEditSchema = z.infer<
	typeof ServiceServiceEditSchema
>;

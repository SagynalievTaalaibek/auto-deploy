import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const OrderProfileSchema = z.object({
	modelCarId: z
		.string({ required_error: 'Модель машины обязателен' })
		.uuid('Некорректный UUID Модель машины'),

	bodyTypeId: z
		.string({ required_error: 'Кузов обязателен' })
		.uuid('Некорректный UUID Кузова'),

	carYear: z
		.string({
			required_error: 'Укажите год выпуска',
			invalid_type_error: 'Год должен быть числом',
		})
		.nonempty('Укажите год выпуска')
		.transform(val => Number(val))
		.refine(val => Number.isInteger(val), {
			message: 'Год должен быть целым числом',
		})
		.refine(val => val >= 1980, {
			message: 'Год должен быть не меньше 1980',
		})
		.refine(val => val <= currentYear, {
			message: `Год должен быть не больше ${currentYear}`,
		}),
	carColor: z
		.string({ required_error: 'Цвет авто обязателен' })
		.min(1, 'Введите цвет авто'),

	orderCategoryIds: z
		.array(z.string().uuid('Некорректный ID категории'))
		.min(1, 'Выберите хотя бы одну категорию'),

	orderServiceIds: z
		.array(z.string().uuid('Некорректный ID услуги'))
		.min(1, 'Выберите хотя бы одну услугу'),

	notes: z.string().optional(),
});

export type TypeOrderProfileSchema = z.infer<typeof OrderProfileSchema>;

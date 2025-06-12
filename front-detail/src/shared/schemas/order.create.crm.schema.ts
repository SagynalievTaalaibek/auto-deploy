import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const OrderCRMSchema = z.object({
	userId: z
		.string({ required_error: 'Пользователь обязателен' })
		.uuid('Некорректный UUID пользователя'),

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

	startTime: z.string({
		required_error: 'Укажите дату начала',
		invalid_type_error: 'Некорректная дата начала',
	}),
	endTime: z.string({
		required_error: 'Укажите дату окончания',
		invalid_type_error: 'Некорректная дата окончания',
	}),

	masterId: z.string().uuid('Некорректный UUID мастера').optional(),
	photos: z.array(z.string().min(1, 'Путь к фото обязателен')).optional(),
	notes: z.string().optional(),

	totalPrice: z
		.string({
			required_error: 'Укажите цену',
			invalid_type_error: 'Цена должен быть числом',
		})
		.nonempty('Укажите цену')
		.transform(val => Number(val))
		.refine(val => Number.isInteger(val), {
			message: 'Цена должен быть целым числом',
		})
		.refine(val => val >= 1000, {
			message: 'Цена должен быть не меньше 1000',
		}),

	orderCategoryIds: z
		.array(z.string().uuid('Некорректный ID категории'))
		.min(1, 'Выберите хотя бы одну категорию'),

	orderServiceIds: z
		.array(z.string().uuid('Некорректный ID услуги'))
		.min(1, 'Выберите хотя бы одну услугу'),
});

export type TypeOrderCRMSchema = z.infer<typeof OrderCRMSchema>;

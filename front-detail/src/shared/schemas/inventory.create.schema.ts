import { z } from 'zod';

export const InventoryCreateSchema = z.object({
	name: z.string().min(1, 'Введите название'),
	category: z.string().min(1, 'Введите категорию'),
	quantity: z.coerce.number().min(1, 'Количество должно быть > 0'),
	minStockLevel: z.coerce.number().min(0, 'Мин. запас ≥ 0'),
	purchasePrice: z.coerce.number().min(0, 'Цена ≥ 0'),
});

export type TypeInventoryCreateSchema = z.infer<typeof InventoryCreateSchema>;

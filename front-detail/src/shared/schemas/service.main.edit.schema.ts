import { z } from 'zod';

export const ServiceMainEditSchema = z.object({
	name: z.string().min(1, 'Название обязательно'),
	description: z.string().min(1, 'Описание обязательно'),
	img: z.string().min(1, 'Картинка обязательно'),
});

export type TypeServiceMainEditSchema = z.infer<typeof ServiceMainEditSchema>;

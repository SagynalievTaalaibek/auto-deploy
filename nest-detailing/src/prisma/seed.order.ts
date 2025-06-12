import { faker } from '@faker-js/faker';

import { PrismaService } from '../prisma/prisma.service';

const prismaService = new PrismaService();

async function main() {
	const users = await prismaService.user.findMany({
		where: { role: 'REGULAR' }
	});
	const masters = await prismaService.user.findMany({
		where: { role: 'MASTER' }
	});
	const brands = await prismaService.brand.findMany({
		include: { models: true }
	});
	const bodyTypes = await prismaService.bodyType.findMany();
	const serviceCategories = await prismaService.serviceCategory.findMany({
		include: { services: true }
	});

	for (let i = 0; i < 500; i++) {
		const user = users[Math.floor(Math.random() * users.length)];
		const master =
			masters.length > 0
				? masters[Math.floor(Math.random() * masters.length)]
				: null;

		const brand = brands[Math.floor(Math.random() * brands.length)];
		const modelCar =
			brand.models[Math.floor(Math.random() * brand.models.length)];
		const bodyType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];

		const carColor = faker.color.human();
		const carYear = faker.date.past({ years: 15 }).getFullYear().toString();

		const createdAt = faker.date.between({
			from: new Date('2025-01-01'),
			to: new Date()
		});

		const statuses = [
			'NEW',
			'CONFIRMED',
			'IN_PROGRESS',
			'COMPLETED',
			'PAID',
			'CLOSED',
			'CANCELLED',
			'RESCHEDULED'
		] as const;
		const status = statuses[Math.floor(Math.random() * statuses.length)];

		const order = await prismaService.order.create({
			data: {
				userId: user.id,
				masterId: master ? master.id : null,
				modelCarId: modelCar.id,
				bodyTypeId: bodyType.id,
				carColor,
				carYear,
				status,
				startTime: faker.date.recent({ days: 30 }),
				endTime: faker.date.soon({ days: 10 }),
				totalPrice: faker.number.int({ min: 1000, max: 10000 }),
				notes: faker.lorem.sentence(),
				photos: [],
				createdAt
			}
		});

		const randomCategories = faker.helpers.arrayElements(
			serviceCategories,
			Math.min(3, serviceCategories.length)
		);
		for (const cat of randomCategories) {
			await prismaService.orderCategory.create({
				data: {
					orderId: order.id,
					categoryId: cat.id
				}
			});
		}

		for (const cat of randomCategories) {
			const randomServices = faker.helpers.arrayElements(
				cat.services,
				Math.min(3, cat.services.length)
			);
			for (const svc of randomServices) {
				await prismaService.orderService.create({
					data: {
						orderId: order.id,
						serviceId: svc.id
					}
				});
			}
		}

		console.log(`✅ Создан заказ #${i + 1}, id: ${order.id}`);
	}
}

main()
	.then(() => {
		console.log('✅ Сидинг завершен.');
		return prismaService.$disconnect();
	})
	.catch(async e => {
		console.error('❌ Ошибка при сидинге:', e);
		await prismaService.$disconnect();
		process.exit(1);
	});

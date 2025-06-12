import { hash } from 'argon2';

import { UserRole } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

import bodyTypeData from './data/carBodyTypes.json';
import carsData from './data/cars.json';
import inventoryData from './data/inventory.json';
import servicesData from './data/services.json';
import usersData from './data/users.json';

const prismaService = new PrismaService();

interface IUser {
	name: string;
	email: string;
	phone: string;
	password: string;
	role: UserRole;
	specialization?: string;
}

const users: IUser[] = usersData.map(user => ({
	...user,
	role: user.role as UserRole
}));

const categories = servicesData;

const cars = carsData;

const carBodyTypes = bodyTypeData;

async function main() {
	// Очистка данных
	await prismaService.bodyType.deleteMany();
	await prismaService.modelCar.deleteMany();
	await prismaService.brand.deleteMany();

	await prismaService.orderService.deleteMany();
	await prismaService.orderCategory.deleteMany();
	await prismaService.order.deleteMany();
	await prismaService.service.deleteMany();
	await prismaService.serviceCategory.deleteMany();

	await prismaService.user.deleteMany();

	for (const user of users) {
		const createdUsers = await prismaService.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password ? await hash(user.password) : '',
				phone: user.phone,
				role: user.role,
				isVerified: true,
				specialization: user.specialization ? user.specialization : ''
			}
		});

		console.log(`✅ Создан user: ${createdUsers.name}`);
	}

	for (const category of categories) {
		const createdCategory = await prismaService.serviceCategory.create({
			data: {
				name: category.name,
				img: category.image,
				description: category.description,
				services: {
					create: category.services.map(s => ({
						name: s.name,
						description: s.description,
						basePriceMin: s.base_price_min,
						basePriceMax: s.base_price_max
					}))
				}
			}
		});

		console.log(`✅ Создана категория: ${createdCategory.name}`);
	}

	for (const car of cars) {
		const createdCategory = await prismaService.brand.create({
			data: {
				name: car.name,
				coefficient: car.coefficient,
				models: {
					create: car.models.map(s => ({
						name: s.name
					}))
				}
			}
		});

		console.log(`✅ Создана машины: ${createdCategory.name}`);
	}

	for (const bodyType of carBodyTypes) {
		const created = await prismaService.bodyType.create({
			data: bodyType
		});
		console.log(`✅ Создан тип кузова: ${created.name}`);
	}

	for (const inventory of inventoryData) {
		const totalCost = inventory.purchasePrice * inventory.quantity;

		const created = await prismaService.inventory.create({
			data: {
				name: inventory.name,
				category: inventory.category,
				quantity: inventory.quantity,
				minStockLevel: inventory.minStockLevel,
				purchasePrice: inventory.purchasePrice,
				totalCost
			}
		});
		console.log(`✅ Создан материал: ${created.name}`);
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

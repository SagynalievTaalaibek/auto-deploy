// inventory.service.ts
import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common';

import { ReceiveInventoryDto } from '@/inventory/dto/receive-inventory.dto';
import { UpdateInventoryDto } from '@/inventory/dto/update-inventory.dto';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateInventoryDto) {
		const totalCost = data.purchasePrice * data.quantity;

		await this.prisma.inventory.create({
			data: {
				name: data.name,
				category: data.category,
				quantity: data.quantity,
				minStockLevel: data.minStockLevel,
				purchasePrice: data.purchasePrice,
				totalCost: totalCost
			}
		});

		return {
			message: 'Материал успешно создан в CRM'
		};
	}

	async deduct(id: string, quantityToDeduct: number) {
		const item = await this.prisma.inventory.findUnique({ where: { id } });

		if (!item) throw new NotFoundException('Товар не найден');

		if (item.quantity < quantityToDeduct) {
			throw new BadRequestException('Недостаточное количество на складе');
		}

		const newQuantity = item.quantity - quantityToDeduct;
		const newTotalCost = newQuantity * (item.purchasePrice ?? 0);

		await this.prisma.inventory.update({
			where: { id },
			data: {
				quantity: newQuantity,
				totalCost: newTotalCost
			}
		});

		return {
			message: 'Материал успешно списан'
		};
	}

	async receive(id: string, dto: ReceiveInventoryDto) {
		const item = await this.prisma.inventory.findUnique({ where: { id } });
		if (!item) throw new NotFoundException('Товар не найден');

		const quantity = Number(dto.quantity);
		const purchasePrice = Number(dto.purchasePrice);

		if (isNaN(quantity) || isNaN(purchasePrice)) {
			throw new BadRequestException({
				message: 'Некорректные данные: количество и цена должны быть числами'
			});
		}

		const newQuantity = item.quantity + quantity;
		const newTotalCost = newQuantity * purchasePrice;

		await this.prisma.inventory.update({
			where: { id },
			data: {
				quantity: newQuantity,
				purchasePrice: purchasePrice,
				totalCost: newTotalCost
			}
		});

		return {
			message: 'Материал успешно добавлен'
		};
	}

	async updateInfo(id: string, dto: UpdateInventoryDto) {
		const existing = await this.prisma.inventory.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Товар не найден');

		await this.prisma.inventory.update({
			where: { id },
			data: {
				name: dto.name,
				category: dto.category
			}
		});

		return {
			message: 'Материал успешно обновлен'
		};
	}

	async findAll() {
		return this.prisma.inventory.findMany();
	}
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CarsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAllCars() {
		return this.prismaService.brand.findMany({
			select: {
				id: true,
				name: true,
				coefficient: true,
				models: {
					select: {
						id: true,
						name: true,
						brandId: true
					}
				}
			}
		});
	}

	async findAllCarsBodyType() {
		return this.prismaService.bodyType.findMany();
	}
}

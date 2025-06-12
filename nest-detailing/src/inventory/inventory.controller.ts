import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post
} from '@nestjs/common';

import { Authorization } from '@/auth/decorators/auth.decorator';
import { CreateInventoryDto } from '@/inventory/dto/create-inventory.dto';
import { ReceiveInventoryDto } from '@/inventory/dto/receive-inventory.dto';
import { UpdateInventoryDto } from '@/inventory/dto/update-inventory.dto';

import { UserRole } from '../../generated/prisma';

import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
	constructor(private readonly inventoryService: InventoryService) {}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Post()
	create(@Body() dto: CreateInventoryDto) {
		return this.inventoryService.create(dto);
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Patch('deduct/:id')
	deduct(@Param('id') id: string, @Body('quantity') quantity: number) {
		return this.inventoryService.deduct(id, quantity);
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Patch('receive/:id')
	receive(@Param('id') id: string, @Body() dto: ReceiveInventoryDto) {
		console.log(dto);
		return this.inventoryService.receive(id, dto);
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	updateInfo(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
		return this.inventoryService.updateInfo(id, dto);
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Get()
	findAll() {
		return this.inventoryService.findAll();
	}
}

import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common';

import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import { CreateOrderClientDto } from '@/order/dto/create-order-client.dto';
import { CreateOrderCRMDto } from '@/order/dto/create-order-crm.dto';
import { UpdateOrderStatusDto } from '@/order/dto/update-order-status.dto';

import { UserRole } from '../../generated/prisma';

import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Post('crm')
	async createOrderCRM(@Body() dto: CreateOrderCRMDto) {
		return this.orderService.createOrderCRM(dto);
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Post('client')
	async createOrder(
		@Authorized('id') userId: string,
		@Body() dto: CreateOrderClientDto
	) {
		return this.orderService.createOrderClient(dto, userId);
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Patch('status/:id')
	public async updateOrderStatus(
		@Param('id') id: string,
		@Body() dto: UpdateOrderStatusDto
	) {
		return this.orderService.updateOrderStatus(id, dto);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	public async updateOrder(
		@Param('id') id: string,
		@Body() dto: CreateOrderCRMDto
	) {
		return this.orderService.updateOrder(id, dto);
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get()
	public async findAll(
		@Authorized('id') userId: string,
		@Query()
		query: {
			profile: boolean;
			crm: boolean;
			masterId?: string;
		}
	) {
		if (query.profile) {
			return this.orderService.findAll({ profile: query.profile }, userId);
		}

		if (query.crm) {
			return this.orderService.findAll({ crm: query.crm }, userId);
		}

		if (query.masterId) {
			return this.orderService.findAll({ masterId: query.masterId }, userId);
		}

		return this.orderService.findAll({}, userId);
	}

	/// BY-ID

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	public async findOne(
		@Param('id') id: string,
		@Query()
		query: {
			update: boolean;
		}
	) {
		if (query.update) {
			return this.orderService.findOne({ update: query.update }, id);
		}

		return this.orderService.findOne({}, id);
	}
}

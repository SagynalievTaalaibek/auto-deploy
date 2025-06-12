import { Module } from '@nestjs/common';

import { UserService } from '@/user/user.service';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService, UserService],
	exports: [OrderService]
})
export class OrderModule {}

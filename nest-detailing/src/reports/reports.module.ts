import { Module } from '@nestjs/common';

import { OrderService } from '@/order/order.service';
import { UserService } from '@/user/user.service';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
	controllers: [ReportsController],
	providers: [ReportsService, UserService, OrderService],
	exports: [ReportsService]
})
export class ReportsModule {}

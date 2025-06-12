import { Module } from '@nestjs/common';

import { OrderService } from '@/order/order.service';
import { UserService } from '@/user/user.service';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
	controllers: [AnalyticsController],
	providers: [AnalyticsService, UserService, OrderService],
	exports: [AnalyticsService]
})
export class AnalyticsModule {}

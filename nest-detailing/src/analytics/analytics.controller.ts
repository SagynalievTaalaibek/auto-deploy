import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { Authorization } from '@/auth/decorators/auth.decorator';

import { UserRole } from '../../generated/prisma';

import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Get('period-stats')
	getPeriodStats(@Query('period') period: 'day' | 'week' | 'month' | 'year') {
		return this.analyticsService.getPeriodStats(period);
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Get('revenue-chart')
	getRevenueChart(@Query('range') range: 'month' | 'year') {
		return this.analyticsService.getRevenueChart(range);
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Get('popular-services')
	getPopularServices() {
		return this.analyticsService.getPopularServices();
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Get('dashboard-stats')
	getOrderStats() {
		return this.analyticsService.getStats();
	}

	@Authorization(UserRole.ADMIN, UserRole.MASTER)
	@HttpCode(HttpStatus.OK)
	@Get('dashboard-active')
	getOrderActive() {
		return this.analyticsService.getActiveOrders();
	}
}

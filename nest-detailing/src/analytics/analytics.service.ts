import { Injectable } from '@nestjs/common';
import {
	eachDayOfInterval,
	eachMonthOfInterval,
	endOfWeek,
	format,
	startOfDay,
	startOfWeek,
	subDays,
	subMonths,
	subYears
} from 'date-fns';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
	constructor(private readonly prisma: PrismaService) {}

	async getPeriodStats(period: 'day' | 'week' | 'month' | 'year') {
		let startDate = new Date();
		switch (period) {
			case 'day':
				startDate = startOfDay(new Date());
				break;
			case 'week':
				startDate = subDays(new Date(), 7);
				break;
			case 'month':
				startDate = subMonths(new Date(), 1);
				break;
			case 'year':
				startDate = subYears(new Date(), 1);
				break;
		}

		const orders = await this.prisma.order.findMany({
			where: {
				AND: [{ createdAt: { gte: startDate } }, { status: 'COMPLETED' }]
			},
			include: { orderServices: { include: { service: true } } }
		});

		const materials = await this.prisma.inventory.findMany({
			where: { createdAt: { gte: startDate } }
		});

		const revenue = orders.reduce(
			(sum, order) => sum + (order.totalPrice || 0),
			0
		);

		const ordersCount = orders.length;
		const averageCheck =
			ordersCount > 0 ? Math.round(revenue / ordersCount) : 0;

		const materialsTotal = materials.reduce((sum, item) => {
			return sum + item.quantity * item.purchasePrice;
		}, 0);

		return {
			period,
			revenue,
			ordersCount,
			averageCheck,
			warehouseExpenses: materialsTotal
		};
	}

	async getRevenueChart(range: 'month' | 'year') {
		const now = new Date();
		const startDate = range === 'month' ? subMonths(now, 1) : subYears(now, 1);

		const orders = await this.prisma.order.findMany({
			where: {
				createdAt: { gte: startDate },
				status: 'COMPLETED'
			}
		});

		const data =
			range === 'month'
				? eachDayOfInterval({ start: startDate, end: now }).map(date => {
						const day = format(date, 'd');
						const revenue = orders
							.filter(
								o =>
									format(o.createdAt, 'yyyy-MM-dd') ===
									format(date, 'yyyy-MM-dd')
							)
							.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
						return { period: day, revenue };
					})
				: eachMonthOfInterval({ start: startDate, end: now }).map(date => {
						const month = format(date, 'LLLL'); // 'Январь', 'Февраль'
						const revenue = orders
							.filter(
								o => format(o.createdAt, 'yyyy-MM') === format(date, 'yyyy-MM')
							)
							.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
						return { period: month, revenue };
					});

		return { range, data };
	}

	async getPopularServices() {
		const services = await this.prisma.orderService.groupBy({
			by: ['serviceId'],
			_count: { serviceId: true },
			orderBy: { _count: { serviceId: 'desc' } },
			take: 5
		});

		const detailed = await Promise.all(
			services.map(async s => {
				const service = await this.prisma.service.findUnique({
					where: { id: s.serviceId }
				});
				return {
					name: service?.name ?? 'Неизвестно',
					value: s._count.serviceId
				};
			})
		);

		return { data: detailed };
	}

	async getStats() {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const weekAgo = new Date(today);
		weekAgo.setDate(weekAgo.getDate() - 7);

		// Кол-во заказов сегодня
		const ordersToday = await this.prisma.order.count({
			where: {
				createdAt: {
					gte: today
				}
			}
		});

		// Кол-во заказов за неделю
		const ordersWeek = await this.prisma.order.count({
			where: {
				createdAt: {
					gte: weekAgo
				}
			}
		});

		// Общая выручка (например, сумма totalPrice за неделю)
		const revenue = await this.prisma.order.aggregate({
			_sum: {
				totalPrice: true
			},
			where: {
				createdAt: {
					gte: weekAgo
				},
				totalPrice: {
					not: null
				}
			}
		});

		// Новые клиенты (зарегистрированные за неделю)
		const newClients = await this.prisma.user.count({
			where: {
				createdAt: {
					gte: weekAgo
				}
			}
		});

		return {
			ordersToday,
			ordersWeek,
			revenue: revenue._sum.totalPrice || 0,
			newClients
		};
	}

	async getActiveOrders() {
		const now = new Date();
		const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // 1 — понедельник
		const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

		return this.prisma.order.findMany({
			where: {
				status: 'IN_PROGRESS',
				startTime: {
					gte: weekStart,
					lte: weekEnd
				}
			},
			select: {
				id: true,
				user: { select: { name: true } },
				orderCategories: {
					select: {
						category: {
							select: {
								name: true
							}
						}
					}
				},
				startTime: true
			},
			orderBy: {
				startTime: 'asc'
			}
		});
	}
}

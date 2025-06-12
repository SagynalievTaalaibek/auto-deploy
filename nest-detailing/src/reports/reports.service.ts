import { Injectable } from '@nestjs/common';
import { endOfDay, parseISO, startOfDay } from 'date-fns';

import { PrismaService } from '@/prisma/prisma.service';

import { ReportTypeDto } from './dto/report-type.dto';

@Injectable()
export class ReportsService {
	constructor(private readonly prismaService: PrismaService) {}

	async getReport({ reportType, startDate, endDate }: ReportTypeDto) {
		const from = startOfDay(parseISO(startDate));
		const to = endOfDay(parseISO(endDate));

		switch (reportType) {
			case 'orders':
				return this.getOrdersReport(from, to);
			case 'finance':
				return this.getFinanceReport(from, to);
			case 'warehouse':
				return this.getWarehouseReport(from, to);
			case 'staff':
				return this.getStaffReport(from, to);
			default:
				throw new Error('Invalid report type');
		}
	}

	private async getOrdersReport(from: Date, to: Date) {
		const orders = await this.prismaService.order.findMany({
			where: {
				createdAt: {
					gte: from,
					lte: to
				},
				status: 'COMPLETED'
			},
			select: {
				id: true,
				createdAt: true,
				user: {
					select: {
						name: true,
						phone: true
					}
				},
				modelCar: {
					select: {
						name: true,
						brand: {
							select: {
								name: true
							}
						}
					}
				},
				carYear: true,
				carColor: true,
				totalPrice: true,
				orderCategories: {
					select: {
						category: {
							select: {
								name: true
							}
						}
					}
				}
			}
		});

		return orders.map(order => ({
			id: order.id,
			date: order.createdAt,
			client_name: order.user.name,
			client_phone: order.user.phone,
			car: `${order.modelCar.brand.name} ${order.modelCar.name} ${order.carYear} ${order.carColor}`,
			totalPrice: order.totalPrice,
			services: order.orderCategories
				.map(c => c.category.name)
				.filter(Boolean)
				.join(', ')
		}));
	}

	private async getFinanceReport(from: Date, to: Date) {
		const orders = await this.prismaService.order.findMany({
			where: {
				createdAt: {
					gte: from,
					lte: to
				},
				status: {
					in: ['PAID', 'COMPLETED'] // только оплаченные или завершенные
				}
			},
			select: {
				totalPrice: true,
				masterId: true,
				modelCar: {
					select: {
						brand: {
							select: {
								id: true,
								name: true
							}
						}
					}
				},
				orderCategories: {
					select: {
						category: {
							select: {
								id: true,
								name: true
							}
						}
					}
				}
			}
		});

		const totalRevenue = orders.reduce(
			(sum, order) => sum + (order.totalPrice ?? 0),
			0
		);
		const ordersCount = orders.length;
		const averageCheck = ordersCount > 0 ? totalRevenue / ordersCount : 0;

		const revenueByBrand: Record<string, { name: string; total: number }> = {};
		const revenueByCategory: Record<string, { name: string; total: number }> =
			{};

		for (const order of orders) {
			const price = order.totalPrice ?? 0;

			// по бренду
			const brandId = order.modelCar.brand.id;
			const brandName = order.modelCar.brand.name;
			revenueByBrand[brandId] = revenueByBrand[brandId] || {
				name: brandName,
				total: 0
			};
			revenueByBrand[brandId].total += price;

			// по категориям
			for (const oc of order.orderCategories) {
				const categoryId = oc.category.id;
				const categoryName = oc.category.name;
				revenueByCategory[categoryId] = revenueByCategory[categoryId] || {
					name: categoryName,
					total: 0
				};
				revenueByCategory[categoryId].total += price;
			}
		}

		return {
			from,
			to,
			revenue: totalRevenue,
			ordersCount,
			averageCheck,
			revenueByCategory: Object.entries(revenueByCategory).map(
				([id, data]) => ({
					categoryId: id,
					categoryName: data.name,
					totalRevenue: data.total
				})
			)
		};
	}

	private async getWarehouseReport(from: Date, to: Date) {
		return this.prismaService.inventory.findMany({
			where: {
				createdAt: {
					gte: from,
					lte: to
				}
			}
		});
	}

	private async getStaffReport(from: Date, to: Date) {
		const staff = await this.prismaService.user.findMany({
			where: {
				createdAt: {
					gte: from,
					lte: to
				}
			},
			include: {
				orders: true,
				masterOrders: true
			}
		});

		const report = staff.map(user => {
			const ordersCount = user.orders.length;
			const masterOrdersCount = user.masterOrders.length;
			const masterTotalRevenue = user.masterOrders.reduce((sum, order) => {
				return sum + (order.totalPrice ?? 0);
			}, 0);

			return {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				specialization: user.specialization,
				ordersCount,
				masterOrdersCount,
				masterTotalRevenue
			};
		});

		return report;
	}
}

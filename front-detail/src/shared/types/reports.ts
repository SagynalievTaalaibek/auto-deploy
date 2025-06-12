export interface ReportOrders {
	id: string;
	client_name: string;
	client_phone: string;
	car: string;
	totalPrice: number;
	services: string;
}

interface RevenueByCategory {
	categoryId: string;
	categoryName: string;
	totalRevenue: number;
}

export interface ReportFinance {
	from: string;
	to: string;
	revenue: number;
	ordersCount: number;
	averageCheck: number;
	revenueByCategory: RevenueByCategory[];
}

export interface ReportStaff {
	id: string;
	name: string;
	email: string;
	role: string;
	specialization: string | null;
	ordersCount: number; // Заказы как клиент
	masterOrdersCount: number; // Заказы как мастер
	masterTotalRevenue: number; // Общий доход мастера
}

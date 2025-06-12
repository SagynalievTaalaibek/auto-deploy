export interface AnalyticsByPeriod {
	period: string;
	revenue: number;
	ordersCount: number;
	averageCheck: number;
	warehouseExpenses: number;
}

export interface AnalyticsRange {
	range: string;
	data: {
		period: string;
		revenue: number;
	}[];
}

export interface AnalyticsPopularService {
	name: string;
	value: number;
}

export interface AnalyticsDashboardStats {
	ordersToday: number;
	ordersWeek: number;
	revenue: number;
	newClients: number;
}

export interface AnalyticsDashboardActive {
	id: string;
	user: {
		name: string;
	};
	orderCategories: {
		category: {
			name: string;
		};
	}[];
	startTime: string;
}

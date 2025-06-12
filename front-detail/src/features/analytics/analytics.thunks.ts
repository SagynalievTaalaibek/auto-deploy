import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosApi from '../../shared/config/axiosApi.ts';
import { API_ROUTES } from '../../shared/constants/constants.ts';
import type {
	AnalyticsByPeriod,
	AnalyticsDashboardActive,
	AnalyticsDashboardStats,
	AnalyticsPopularService,
	AnalyticsRange,
} from '../../shared/types/analytics.ts';

export const fetchAnalyticsByPeriod = createAsyncThunk(
	'analytics/fetchAnalyticsByPeriod',
	async (period: string) => {
		const response = await axiosApi.get<AnalyticsByPeriod>(
			`${API_ROUTES.ANALYTICS_GET_PERIOD}${period}`,
		);
		return response.data;
	},
);

export const fetchAnalyticsRange = createAsyncThunk(
	'analytics/fetchAnalyticsRange',
	async (range: string) => {
		const response = await axiosApi.get<AnalyticsRange>(
			`${API_ROUTES.ANALYTICS_GET_RANGE}${range}`,
		);
		return response.data;
	},
);

export const fetchAnalyticsPopularService = createAsyncThunk(
	'analytics/fetchAnalyticsPopularService',
	async () => {
		const response = await axiosApi.get<{ data: AnalyticsPopularService[] }>(
			API_ROUTES.ANALYTICS_GET_POPULAR_SERVICE,
		);
		return response.data.data;
	},
);

export const fetchAnalyticsDashboardStats = createAsyncThunk(
	'analytics/fetchAnalyticsDashboardStats',
	async () => {
		const response = await axiosApi.get<AnalyticsDashboardStats>(
			API_ROUTES.ANALYTICS_GET_DASHBOARD_STATS,
		);
		return response.data;
	},
);

export const fetchAnalyticsDashboardActive = createAsyncThunk(
	'analytics/fetchAnalyticsDashboardActive',
	async () => {
		const response = await axiosApi.get<AnalyticsDashboardActive[]>(
			API_ROUTES.ANALYTICS_GET_DASHBOARD_ACTIVE,
		);
		return response.data;
	},
);

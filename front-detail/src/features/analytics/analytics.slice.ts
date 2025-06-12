import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store/store.ts';
import type {
	AnalyticsByPeriod,
	AnalyticsDashboardActive,
	AnalyticsDashboardStats,
	AnalyticsPopularService,
	AnalyticsRange,
} from '../../shared/types/analytics.ts';

import {
	fetchAnalyticsByPeriod,
	fetchAnalyticsDashboardActive,
	fetchAnalyticsDashboardStats,
	fetchAnalyticsPopularService,
	fetchAnalyticsRange,
} from './analytics.thunks.ts';

interface AnalyticsState {
	loading: boolean;
	analyticsByPeriod: AnalyticsByPeriod | null;
	analyticsRange: AnalyticsRange | null;
	analyticsPopularService: AnalyticsPopularService[];
	analyticsDashboardStats: AnalyticsDashboardStats | null;
	analyticsDashboardActive: AnalyticsDashboardActive[];
}

const initialState: AnalyticsState = {
	loading: false,
	analyticsByPeriod: null,
	analyticsRange: null,
	analyticsPopularService: [],
	analyticsDashboardStats: null,
	analyticsDashboardActive: [],
};

const analyticsSlice = createSlice({
	name: 'analytics',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAnalyticsByPeriod.pending, state => {
				state.loading = true;
			})
			.addCase(fetchAnalyticsByPeriod.fulfilled, (state, action) => {
				state.loading = false;
				state.analyticsByPeriod = action.payload;
			})
			.addCase(fetchAnalyticsByPeriod.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchAnalyticsRange.pending, state => {
				state.loading = true;
			})
			.addCase(fetchAnalyticsRange.fulfilled, (state, action) => {
				state.loading = false;
				state.analyticsRange = action.payload;
			})
			.addCase(fetchAnalyticsRange.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchAnalyticsPopularService.pending, state => {
				state.loading = true;
			})
			.addCase(fetchAnalyticsPopularService.fulfilled, (state, action) => {
				state.loading = false;
				state.analyticsPopularService = action.payload;
			})
			.addCase(fetchAnalyticsPopularService.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchAnalyticsDashboardStats.pending, state => {
				state.loading = true;
			})
			.addCase(fetchAnalyticsDashboardStats.fulfilled, (state, action) => {
				state.loading = false;
				state.analyticsDashboardStats = action.payload;
			})
			.addCase(fetchAnalyticsDashboardStats.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchAnalyticsDashboardActive.pending, state => {
				state.loading = true;
			})
			.addCase(fetchAnalyticsDashboardActive.fulfilled, (state, action) => {
				state.loading = false;
				state.analyticsDashboardActive = action.payload;
			})
			.addCase(fetchAnalyticsDashboardActive.rejected, state => {
				state.loading = false;
			});
	},
});

export const analyticsReducer = analyticsSlice.reducer;
export const selectAnalyticsLoading = (state: RootState) =>
	state.analytics.loading;
export const selectAnalyticsByPeriod = (state: RootState) =>
	state.analytics.analyticsByPeriod;

export const selectAnalyticsRange = (state: RootState) =>
	state.analytics.analyticsRange;

export const selectAnalyticsPopularService = (state: RootState) =>
	state.analytics.analyticsPopularService;

export const selectAnalyticsDashboardStats = (state: RootState) =>
	state.analytics.analyticsDashboardStats;

export const selectAnalyticsDashboardActive = (state: RootState) =>
	state.analytics.analyticsDashboardActive;

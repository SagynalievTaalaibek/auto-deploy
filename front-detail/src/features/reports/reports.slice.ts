import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store/store.ts';
import type { InventoryGet } from '../../shared/types/inventory.ts';
import type {
	ReportFinance,
	ReportOrders,
	ReportStaff,
} from '../../shared/types/reports.ts';

import { fetchReport } from './reports.thunks.ts';

interface ReportsState {
	loading: boolean;
	ordersReport: ReportOrders[];
	financeReport: ReportFinance | null;
	inventoryReport: InventoryGet[];
	staffReport: ReportStaff[];
}

const initialState: ReportsState = {
	loading: false,
	ordersReport: [],
	financeReport: null,
	inventoryReport: [],
	staffReport: [],
};

export const reportsSlice = createSlice({
	name: 'reports',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchReport.pending, state => {
				state.loading = true;
			})
			.addCase(fetchReport.fulfilled, (state, action) => {
				const { reportType, data } = action.payload;

				if (reportType === 'orders') {
					state.ordersReport = data as ReportOrders[];
				} else if (reportType === 'finance') {
					state.financeReport = data as ReportFinance;
				} else if (reportType === 'warehouse') {
					state.inventoryReport = data as InventoryGet[];
				} else if (reportType === 'staff') {
					state.staffReport = data as ReportStaff[];
				}

				state.loading = false;
			})
			.addCase(fetchReport.rejected, state => {
				state.loading = false;
			});
	},
});

export const reportsReducer = reportsSlice.reducer;
export const selectReportsLoading = (state: RootState) => state.reports.loading;
export const selectReportsOrders = (state: RootState) =>
	state.reports.ordersReport;
export const selectReportFinance = (state: RootState) =>
	state.reports.financeReport;

export const selectReportInventory = (state: RootState) =>
	state.reports.inventoryReport;

export const selectReportStaff = (state: RootState) =>
	state.reports.staffReport;

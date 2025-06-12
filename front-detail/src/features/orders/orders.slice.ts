import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store/store.ts';
import type { TypeOrderCRMSchema } from '../../shared/schemas/order.create.crm.schema.ts';
import type {
	IOrder,
	OrderGetCRM,
	OrderGetProfile,
} from '../../shared/types/orders.ts';

import {
	fetchOneOrder,
	fetchOneOrderUpdate,
	fetchOrderProfile,
	fetchOrdersCRM,
} from './orders.thunks.ts';

interface OrdersState {
	loading: boolean;
	oneOrder: IOrder | null;
	oneOrderUpdate: TypeOrderCRMSchema | null;
	ordersProfile: OrderGetProfile[];
	ordersCRM: OrderGetCRM[];
}

const initialState: OrdersState = {
	loading: true,
	oneOrder: null,
	oneOrderUpdate: null,
	ordersProfile: [],
	ordersCRM: [],
};

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchOrderProfile.pending, state => {
				state.loading = true;
			})
			.addCase(fetchOrderProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.ordersProfile = action.payload;
			})
			.addCase(fetchOrderProfile.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchOrdersCRM.pending, state => {
				state.loading = true;
			})
			.addCase(fetchOrdersCRM.fulfilled, (state, action) => {
				state.loading = false;
				state.ordersCRM = action.payload;
			})
			.addCase(fetchOrdersCRM.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchOneOrder.pending, state => {
				state.loading = true;
			})
			.addCase(fetchOneOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.oneOrder = action.payload;
			})
			.addCase(fetchOneOrder.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchOneOrderUpdate.pending, state => {
				state.loading = true;
			})
			.addCase(fetchOneOrderUpdate.fulfilled, (state, action) => {
				state.loading = false;
				state.oneOrderUpdate = action.payload;
			})
			.addCase(fetchOneOrderUpdate.rejected, state => {
				state.loading = false;
			});
	},
});

export const ordersReducer = ordersSlice.reducer;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersGetProfile = (state: RootState) =>
	state.orders.ordersProfile;
export const selectOrdersCRM = (state: RootState) => state.orders.ordersCRM;
export const selectOneOrder = (state: RootState) => state.orders.oneOrder;
export const selectOneOrderUpdate = (state: RootState) =>
	state.orders.oneOrderUpdate;

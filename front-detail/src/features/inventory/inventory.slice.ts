import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store/store.ts';
import type { InventoryGet } from '../../shared/types/inventory.ts';

import { findAllInventory } from './inventory.thunks.ts';

interface InventoryState {
	loading: boolean;
	inventoryData: InventoryGet[];
}

const initialState: InventoryState = {
	loading: false,
	inventoryData: [],
};

export const inventorySlice = createSlice({
	name: 'inventory',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(findAllInventory.pending, state => {
				state.loading = true;
			})
			.addCase(findAllInventory.fulfilled, (state, action) => {
				state.inventoryData = action.payload;
				state.loading = false;
			})
			.addCase(findAllInventory.rejected, state => {
				state.loading = false;
			});
	},
});

export const inventoryReducer = inventorySlice.reducer;
export const selectInventoryLoading = (state: RootState) =>
	state.inventory.loading;
export const selectInventoryData = (state: RootState) =>
	state.inventory.inventoryData;

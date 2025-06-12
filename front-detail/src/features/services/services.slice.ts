import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store/store.ts';
import type { IMainService, IService } from '../../shared/types/services.ts';

import {
	fetchMainServices,
	fetchOneMainServices,
	fetchOneServices,
} from './services.thunks.ts';

interface ServiceState {
	mainServices: IMainService[];
	oneMainServices: IMainService | null;
	oneServices: IService | null;
	loading: boolean;
}

const initialState: ServiceState = {
	mainServices: [],
	oneMainServices: null,
	oneServices: null,
	loading: false,
};

export const serviceSlice = createSlice({
	name: 'service',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchMainServices.pending, state => {
				state.loading = true;
			})
			.addCase(fetchMainServices.fulfilled, (state, action) => {
				state.loading = false;
				state.mainServices = action.payload;
			})
			.addCase(fetchMainServices.rejected, state => {
				state.loading = false;
			});
		builder
			.addCase(fetchOneMainServices.pending, state => {
				state.loading = true;
			})
			.addCase(fetchOneMainServices.fulfilled, (state, action) => {
				state.oneMainServices = action.payload;
				state.loading = false;
			})
			.addCase(fetchOneMainServices.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchOneServices.pending, state => {
				state.loading = true;
			})
			.addCase(fetchOneServices.fulfilled, (state, action) => {
				state.oneServices = action.payload;
				state.loading = false;
			})
			.addCase(fetchOneServices.rejected, state => {
				state.loading = false;
			});
	},
});

export const serviceReducer = serviceSlice.reducer;
export const selectMainServices = (state: RootState) =>
	state.services.mainServices;
export const selectOneMainServices = (state: RootState) =>
	state.services.oneMainServices;
export const selectOneServices = (state: RootState) =>
	state.services.oneServices;
export const selectLoadingServices = (state: RootState) =>
	state.services.loading;

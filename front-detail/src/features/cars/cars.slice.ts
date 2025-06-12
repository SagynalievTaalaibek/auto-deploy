import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store/store.ts';
import type { ICarBodyType, ICarGet } from '../../shared/types/cars.ts';

import { fetchCars, fetchCarsBodyType } from './cars.thunks.ts';

interface CarsState {
	loading: boolean;
	carsData: ICarGet[];
	carsBodyType: ICarBodyType[];
}

const initialState: CarsState = {
	loading: false,
	carsData: [],
	carsBodyType: [],
};

const carsSlice = createSlice({
	name: 'cars',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCars.pending, state => {
				state.loading = true;
			})
			.addCase(fetchCars.fulfilled, (state, action) => {
				state.loading = false;
				state.carsData = action.payload;
			})
			.addCase(fetchCars.rejected, state => {
				state.loading = false;
			});

		builder
			.addCase(fetchCarsBodyType.pending, state => {
				state.loading = true;
			})
			.addCase(fetchCarsBodyType.fulfilled, (state, action) => {
				state.loading = false;
				state.carsBodyType = action.payload;
			})
			.addCase(fetchCarsBodyType.rejected, state => {
				state.loading = false;
			});
	},
});

export const carsReducer = carsSlice.reducer;
export const selectCarsLoading = (state: RootState) => state.cars.loading;
export const selectCars = (state: RootState) => state.cars.carsData;
export const selectCarsBodyType = (state: RootState) => state.cars.carsBodyType;

import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosApi from '../../shared/config/axiosApi.ts';
import { API_ROUTES } from '../../shared/constants/constants.ts';
import type { ICarBodyType, ICarGet } from '../../shared/types/cars.ts';

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
	const response = await axiosApi.get<ICarGet[]>(API_ROUTES.CARS_GET);
	return response.data;
});

export const fetchCarsBodyType = createAsyncThunk(
	'cars/fetchCarsBodyType',
	async () => {
		const response = await axiosApi.get<ICarBodyType[]>(
			API_ROUTES.CARS_BODY_TYPE_GET,
		);
		return response.data;
	},
);

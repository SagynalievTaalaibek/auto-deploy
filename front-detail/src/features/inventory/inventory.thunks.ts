import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

import axiosApi from '../../shared/config/axiosApi.ts';
import { API_ROUTES } from '../../shared/constants/constants.ts';
import type { TypeInventoryCreateSchema } from '../../shared/schemas/inventory.create.schema.ts';
import type { ErrorResponse } from '../../shared/types/error.ts';
import { logout } from '../auth/authSlice.ts';

export const createInventory = createAsyncThunk(
	'inventory/createInventory',
	async (data: TypeInventoryCreateSchema, { rejectWithValue, dispatch }) => {
		try {
			const inventory = await axiosApi.post(API_ROUTES.INVENTORY_CREATE, data);
			return inventory.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return rejectWithValue(
				axiosError.response?.data?.message || 'CREATE Inventory FAILED',
			);
		}
	},
);

export const findAllInventory = createAsyncThunk(
	'inventory/findAllInventory',
	async () => {
		const response = await axiosApi.get(API_ROUTES.INVENTORY_CREATE);
		return response.data;
	},
);

interface InventoryUpdate {
	id: string;
	name: string;
	category: string;
}

export const updateInventory = createAsyncThunk(
	'inventory/updateInventory',
	async (data: InventoryUpdate, { rejectWithValue, dispatch }) => {
		try {
			const response = await axiosApi.patch(
				`${API_ROUTES.INVENTORY_CREATE}/${data.id}`,
				{ name: data.name, category: data.category },
			);
			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return rejectWithValue(
				axiosError.response?.data?.message || 'UPDATE Inventory FAILED',
			);
		} finally {
			dispatch(findAllInventory());
		}
	},
);

export const deductInventory = createAsyncThunk(
	'inventory/deductInventory',
	async (
		{ quantity, id }: { quantity: number; id: string },
		{ rejectWithValue, dispatch },
	) => {
		try {
			const response = await axiosApi.patch(
				`${API_ROUTES.INVENTORY_DEDUCT}/${id}`,
				{ quantity: quantity },
			);
			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return rejectWithValue(
				axiosError.response?.data?.message || 'UPDATE Inventory FAILED',
			);
		} finally {
			dispatch(findAllInventory());
		}
	},
);

export const receiveInventory = createAsyncThunk(
	'inventory/receiveInventory',
	async (
		{
			quantity,
			purchasePrice,
			id,
		}: { quantity: number; purchasePrice: number; id: string },
		{ rejectWithValue, dispatch },
	) => {
		try {
			const response = await axiosApi.patch(
				`${API_ROUTES.INVENTORY_RECEIVE}/${id}`,
				{ quantity: quantity, purchasePrice: purchasePrice },
			);
			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return rejectWithValue(
				axiosError.response?.data?.message || 'UPDATE Inventory FAILED',
			);
		} finally {
			dispatch(findAllInventory());
		}
	},
);

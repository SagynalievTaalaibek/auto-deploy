import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

import axiosApi from '../../shared/config/axiosApi.ts';
import { API_ROUTES } from '../../shared/constants/constants.ts';
import type { TypeOrderProfileSchema } from '../../shared/schemas';
import type { TypeOrderCRMSchema } from '../../shared/schemas/order.create.crm.schema.ts';
import type { ErrorResponse } from '../../shared/types/error.ts';
import type {
	IOrder,
	OrderGetCRM,
	OrderGetProfile,
	UnifiedOrderSchema,
} from '../../shared/types/orders.ts';
import { logout } from '../auth/authSlice.ts';

export const fetchOrderProfile = createAsyncThunk<OrderGetProfile[], undefined>(
	'orders/fetchOrderGetProfile',
	async (_, { dispatch }) => {
		try {
			const response = await axiosApi.get<OrderGetProfile[]>(
				API_ROUTES.ORDER_GET_PROFILE,
			);
			return response.data;
		} catch (err: unknown) {
			const axiosError = err as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return [];
		}
	},
);

export const createOrderClient = createAsyncThunk(
	'orders/createOrderClient',
	async (data: TypeOrderProfileSchema, { rejectWithValue, dispatch }) => {
		try {
			const order = await axiosApi.post(API_ROUTES.CREATE_ORDER_CLIENT, {
				...data,
				carYear: String(data.carYear),
			});
			return order.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return rejectWithValue(
				axiosError.response?.data?.message || 'CREATE ORDER FAILED',
			);
		}
	},
);

// // ADMIN

export const fetchOrdersCRM = createAsyncThunk(
	'orders/fetchOrdersCRM',
	async (masterId?: string) => {
		const response = await axiosApi.get<OrderGetCRM[]>(
			masterId
				? `${API_ROUTES.ORDER_GET_CRM_MASTER}${masterId}`
				: API_ROUTES.ORDER_GET_CRM,
		);
		return response.data;
	},
);

export const fetchOneOrder = createAsyncThunk<IOrder, string>(
	'orders/fetchOneOrder',
	async id => {
		const response = await axiosApi.get<IOrder>(
			`${API_ROUTES.ORDER_GET_ONE}/${id}`,
		);
		return response.data;
	},
);

export const fetchOneOrderUpdate = createAsyncThunk<TypeOrderCRMSchema, string>(
	'orders/fetchOneOrderUpdate',
	async id => {
		const response = await axiosApi.get<TypeOrderCRMSchema>(
			`${API_ROUTES.ORDER_GET_ONE}/${id}?update=true`,
		);
		return response.data;
	},
);

export const createOrderCRM = createAsyncThunk(
	'orders/createOrderCRM',
	async (data: UnifiedOrderSchema, { rejectWithValue, dispatch }) => {
		try {
			const order = await axiosApi.post(API_ROUTES.CREATE_ORDER_CRM, {
				...data,
				carYear: String(data.carYear),
			});
			return order.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return rejectWithValue(
				axiosError.response?.data?.message || 'CREATE ORDER FAILED',
			);
		}
	},
);

interface ChangeOrderStatusProps {
	status: string;
	id: string;
}

export const changeOrderStatus = createAsyncThunk<
	undefined,
	ChangeOrderStatusProps
>(
	'orders/changeOrderStatus',
	async ({ status, id }, { rejectWithValue, dispatch }) => {
		try {
			const response = await axiosApi.patch(
				`${API_ROUTES.ORDER_UPDATE_STATUS}/${id}`,
				{
					status,
				},
			);
			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return rejectWithValue(
				axiosError.response?.data?.message || 'UPDATE STATUS ORDER FAILED',
			);
		}
	},
);

interface UpdateOrderProps {
	data: UnifiedOrderSchema;
	id: string;
}

export const updateOrder = createAsyncThunk<undefined, UpdateOrderProps>(
	'orders/updateOrder',
	async ({ data, id }, { rejectWithValue, dispatch }) => {
		try {
			const response = await axiosApi.patch(
				`${API_ROUTES.ORDER_UPDATE}/${id}`,
				{
					...data,
					carYear: String(data.carYear),
				},
			);
			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<ErrorResponse>;

			if (axiosError?.response?.status === 401) {
				dispatch(logout());
			}

			return rejectWithValue(
				axiosError.response?.data?.message || 'UPDATE ORDER FAILED',
			);
		}
	},
);

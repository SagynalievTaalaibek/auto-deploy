import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosApi from '../../shared/config/axiosApi.ts';
import { API_ROUTES } from '../../shared/constants/constants.ts';
import type { TypeServiceAddSchema } from '../../shared/schemas/service.add.schema.ts';
import type { TypeServiceMainEditSchema } from '../../shared/schemas/service.main.edit.schema.ts';
import type { TypeServiceServiceEditSchema } from '../../shared/schemas/service.service.edit.schema.ts';

export const fetchMainServices = createAsyncThunk(
	'services/fetchMainServices',
	async () => {
		const response = await axiosApi.get(API_ROUTES.MAIN_SERVICES_GET);
		return response.data;
	},
);

export const fetchOneMainServices = createAsyncThunk(
	'services/fetchOneMainServices',
	async (id: string) => {
		const response = await axiosApi.get(
			`${API_ROUTES.MAIN_SERVICES_GET_ONE}/${id}`,
		);
		return response.data;
	},
);

export const fetchOneServices = createAsyncThunk(
	'services/fetchOneServices',
	async (id: string) => {
		const response = await axiosApi.get(`${API_ROUTES.SERVICES_GET_ONE}/${id}`);
		return response.data;
	},
);

export const createMainService = createAsyncThunk(
	'services/createMainService',
	async (data: TypeServiceAddSchema) => {
		await axiosApi.post(`${API_ROUTES.SERVICES_CREATE}`, data);
	},
);

export const updateMainService = createAsyncThunk(
	'services/updateMainService',
	async ({ data, id }: { data: TypeServiceMainEditSchema; id: string }) => {
		await axiosApi.put(`${API_ROUTES.MAIN_SERVICES_EDIT}/${id}`, data);
	},
);

export const updateService = createAsyncThunk(
	'services/updateService',
	async ({ data, id }: { data: TypeServiceServiceEditSchema; id: string }) => {
		await axiosApi.put(`${API_ROUTES.SERVICES_EDIT}/${id}`, data);
	},
);

export const deleteService = createAsyncThunk(
	'services/deleteService',
	async (id: string) => {
		await axiosApi.delete(`${API_ROUTES.SERVICES_DELETE}/${id}`);
	},
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosApi from '../../shared/config/axiosApi.ts';
import { API_ROUTES } from '../../shared/constants/constants.ts';

export const fetchContactInfo = createAsyncThunk(
	'settings/fetchContactInfo',
	async () => {
		const response = await axiosApi.get(API_ROUTES.CONTACTS_INFO);
		return response.data;
	},
);

interface ContactProps {
	title?: string;
	subTitle?: string;
	address?: string;
	phone?: string;
	email?: string;
	workingHours?: string;
	telegramUrl?: string;
	whatsappUrl?: string;
	instagramUrl?: string;
	mapUrl?: string;
}

export const updateContactInfo = createAsyncThunk(
	'settings/updateContactInfo',
	async (data: ContactProps) => {
		await axiosApi.put(API_ROUTES.CONTACTS_INFO, data);
	},
);

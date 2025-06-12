import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';

import axiosApi from '../../shared/config/axiosApi.ts';
import { API_ROUTES } from '../../shared/constants/constants.ts';

interface ReportInterface {
	reportType: string;
	startDate: Dayjs | null;
	endDate: Dayjs | null;
}

export const fetchReport = createAsyncThunk(
	'reports/fetchReport',
	async (data: ReportInterface) => {
		const response = await axiosApi.post(API_ROUTES.REPORTS_GET, data);

		return {
			reportType: data.reportType,
			data: response.data,
		};
	},
);

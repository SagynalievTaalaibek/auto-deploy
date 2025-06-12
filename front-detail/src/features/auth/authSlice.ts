import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store/store.ts';
import type {
	IMasterDataCRM,
	IUser,
	IUsersDataCRM,
} from '../../shared/types/user.ts';

import {
	fetchMastersCRM,
	fetchUsersCRM,
	loginUser,
	verifyEmail,
} from './authThunks.ts';

interface AuthState {
	user: IUser | null;
	userCRM: IUsersDataCRM[];
	masterCRM: IMasterDataCRM[];
	loading: boolean;
	error: string | null;
	message: string | null;
}

const initialState: AuthState = {
	user: null,
	userCRM: [],
	masterCRM: [],
	loading: false,
	error: null,
	message: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.user = null;
		},
		saveUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(fetchUsersCRM.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsersCRM.fulfilled, (state, action) => {
				state.loading = false;
				state.userCRM = action.payload;
			})
			.addCase(fetchUsersCRM.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});

		builder
			.addCase(fetchMastersCRM.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMastersCRM.fulfilled, (state, action) => {
				state.loading = false;
				state.masterCRM = action.payload;
			})
			.addCase(fetchMastersCRM.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
		builder
			.addCase(verifyEmail.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(verifyEmail.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Ошибка';
			});
	},
});

export const authReducer = authSlice.reducer;
export const { logout, saveUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserLoading = (state: RootState) => state.auth.loading;
export const selectUsersCRM = (state: RootState) => state.auth.userCRM;
export const selectMastersCRM = (state: RootState) => state.auth.masterCRM;

import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store/store.ts';
import type { ContactsGet } from '../../shared/types/contacts.ts';

import { fetchContactInfo } from './settings.thunks.ts';

interface SettingsState {
	loading: boolean;
	contactInfo: ContactsGet | null;
}

const initialState: SettingsState = {
	loading: true,
	contactInfo: null,
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchContactInfo.pending, state => {
				state.loading = true;
			})
			.addCase(fetchContactInfo.fulfilled, (state, action) => {
				state.contactInfo = action.payload;
				state.loading = false;
			})
			.addCase(fetchContactInfo.rejected, state => {
				state.loading = false;
			});
	},
});

export const settingsReducer = settingsSlice.reducer;
export const selectLoadingSettings = (state: RootState) =>
	state.settings.loading;
export const selectContactsInfo = (state: RootState) =>
	state.settings.contactInfo;

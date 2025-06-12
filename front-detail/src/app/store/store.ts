import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { analyticsReducer } from '../../features/analytics/analytics.slice.ts';
import { authReducer } from '../../features/auth/authSlice.ts';
import { carsReducer } from '../../features/cars/cars.slice.ts';
import { inventoryReducer } from '../../features/inventory/inventory.slice.ts';
import { ordersReducer } from '../../features/orders/orders.slice.ts';
import { reportsReducer } from '../../features/reports/reports.slice.ts';
import { serviceReducer } from '../../features/services/services.slice.ts';
import { settingsReducer } from '../../features/settings/settings.slice.ts';

const usersPersistConfig = {
	key: 'auto-detailing:users',
	storage: storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	auth: persistReducer(usersPersistConfig, authReducer),
	services: serviceReducer,
	orders: ordersReducer,
	cars: carsReducer,
	reports: reportsReducer,
	inventory: inventoryReducer,
	analytics: analyticsReducer,
	settings: settingsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

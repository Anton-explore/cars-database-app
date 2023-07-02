import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { carsReducer } from './carsSlice';

const rootReducer = combineReducers({
	cars: carsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
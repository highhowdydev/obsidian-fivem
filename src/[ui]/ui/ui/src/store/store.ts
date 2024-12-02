import { configureStore } from "@reduxjs/toolkit";
import root from ".";

export interface ReducerAction<T = any> {
	type: string;
	payload?: T;
}

const store = configureStore({
	reducer: root,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;

// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rosterReducer from "./roster/rosterSlice";

export const store = configureStore({
	reducer: {
		roster: rosterReducer,
	},
});

// These types will help in hooks later
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

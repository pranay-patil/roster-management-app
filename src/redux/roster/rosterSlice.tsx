// src/redux/roster/rosterSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchRosterData } from "./rosterAPI";
import { RosterItem } from "./types";

interface RosterState {
	roster: RosterItem[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	originalRoster: RosterItem[];
}

const initialState: RosterState = {
	roster: [],
	status: "idle",
	error: null,
	originalRoster: [],
};

const userTypes = {
	"0": "All services",
	"101": "therapist",
	"102": "psychiatrist",
};
const inHouseTypes = {
	"0": "All types",
	"1": false,
	"2": true,
};

// Async thunk to fetch data
export const fetchRoster = createAsyncThunk("roster/fetchRoster", async () => {
	const response = await fetchRosterData();
	return response;
});

const rosterSlice = createSlice({
	name: "roster",
	initialState,
	reducers: {
		filterProviders(
			state,
			action: PayloadAction<{ provider_usertype: string; is_inhouse: string; clinic_details: string }>,
		) {
			const { provider_usertype, is_inhouse, clinic_details } = action.payload;

			// Reset case: if all are "0", restore original full data
			if (provider_usertype === "0" && is_inhouse === "0" && clinic_details === "0") {
				state.roster = state.originalRoster; // assuming you store original data somewhere like `originalRoster`
				return;
			}

			state.roster = state.originalRoster.filter((provider) => {
				const matchProviderType =
					provider_usertype === "0" ||
					provider.provider_usertype === userTypes[provider_usertype as keyof typeof userTypes];
				const matchIsInhouse =
					is_inhouse === "0" || provider.is_inhouse === inHouseTypes[is_inhouse as keyof typeof inHouseTypes];
				const matchClinic = clinic_details === "0" || provider.clinic_details.id.toString() === clinic_details;

				return matchProviderType && matchIsInhouse && matchClinic;
			});
			return state;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRoster.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchRoster.fulfilled, (state, action: PayloadAction<RosterItem[]>) => {
				state.status = "succeeded";
				state.roster = action.payload;
				state.originalRoster = action.payload; // Store original data for filtering
			})
			.addCase(fetchRoster.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Something went wrong";
			});
	},
});

export const { filterProviders } = rosterSlice.actions;

export default rosterSlice.reducer;

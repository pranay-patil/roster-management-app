// src/redux/roster/types.ts

export interface Availability {
	online_slots: string[];
	offline_slots: string[];
	both_slots: string[];
	online_booked_slots: string[];
	offline_booked_slots: string[];
	blocked_slots: { slot: string; reason: string }[];
}

export interface ClinicDetails {
	id: number;
	name: string;
}

export interface RosterItem {
	name: string;
	provider_usertype: "therapist" | "psychiatrist";
	is_inhouse: boolean;
	id: number;
	image: string;
	clinic_details: ClinicDetails;
	availabilities: Availability[];
}

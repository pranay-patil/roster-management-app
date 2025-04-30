type SlotData = {
	online_slots: string[];
	offline_slots: string[];
	both_slots: string[];
	online_booked_slots: string[];
	offline_booked_slots: string[];
	blocked_slots: { slot: string; reason: string }[];
};

type Theme = {
	colors: {
		online_slots: string;
		offline_slots: string;
		both_slots: string;
		online_booked_slots: string;
		offline_booked_slots: string;
		blocked_slots: string;
		grey: string;
	};
};

type Event = {
	id: string;
	title: string;
	start: string;
	end: string;
	color: string;
	description: string;
	isVideo: boolean;
};

export const convertSlotsToEvents = (
	date: string, // e.g. "2025-04-28"
	slots: SlotData,
	theme: Theme,
): Event[] => {
	const result: Event[] = [];
	let idCounter = 1;

	const addSlot = (time: string, title: string, color: string, description: string) => {
		const [hours, minutes] = time.split(":").map(Number);
		const start = new Date(date);
		start.setHours(hours, minutes, 0, 0);

		const end = new Date(start.getTime() + 15 * 60 * 1000);

		result.push({
			id: `${Date.now()}${idCounter++}`,
			title: `#${Math.floor(Date.now() / 10000000)}${idCounter++}`,
			start: start.toISOString(),
			end: end.toISOString(),
			color,
			description,
			isVideo: title === "Online",
		});
	};

	slots.online_slots.forEach((slot) => addSlot(slot, "Online", theme.colors.online_slots, "Available online slot"));
	slots.offline_slots.forEach((slot) =>
		addSlot(slot, "Offline", theme.colors.offline_slots, "Available offline slot"),
	);
	slots.both_slots.forEach((slot) => addSlot(slot, "Online + Offline", theme.colors.both_slots, "Available both"));
	slots.online_booked_slots.forEach((slot) =>
		addSlot(slot, "Online Booked", theme.colors.online_booked_slots, "Booked online"),
	);
	slots.offline_booked_slots.forEach((slot) =>
		addSlot(slot, "Offline Booked", theme.colors.offline_booked_slots, "Booked offline"),
	);
	slots.blocked_slots.forEach((item) => addSlot(item.slot, "Blocked", theme.colors.blocked_slots, item.reason));

	return result;
};

type FilterState = {
	provider_usertype: string;
	is_inhouse: string;
	clinic_details: string;
};

export const isFilterApplied = (filter: FilterState): boolean => {
	return filter.provider_usertype !== "0" || filter.is_inhouse !== "0" || filter.clinic_details !== "0";
};

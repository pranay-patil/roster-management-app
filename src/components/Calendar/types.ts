export type CalendarView = "month" | "week" | "day";

export type Event = {
	id: string;
	title: string;
	start: Date;
	end: Date;
	color: string;
	description?: string;
};

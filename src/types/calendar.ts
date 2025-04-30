export type MeetingType = "video" | "in_person" | "call";
export interface CalendarEvent {
	id: string;
	title: string;
	start: Date;
	end: Date;
	color?: string;
	description?: string;
	location?: string;
	attendees?: string[];
	allDay?: boolean;
}

export type CalendarView = "day" | "week" | "month";

export interface CalendarProps {
	events: CalendarEvent[];
	onEventClick?: (event: CalendarEvent) => void;
	onEventCreate?: (event: Omit<CalendarEvent, "id">) => void;
	onEventUpdate?: (event: CalendarEvent) => void;
	onEventDelete?: (eventId: string) => void;
	initialView?: CalendarView;
	initialDate?: Date;
}

export type Event = {
	id: string;
	title: string;
	start: Date;
	end: Date;
	color: string;
	description?: string;
};

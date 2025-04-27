/* eslint-disable */
import { useState, useEffect } from "react";
import { Event } from "./types";

export const useCalendarEvents = () => {
	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const savedEvents = localStorage.getItem("calendarEvents");
		if (savedEvents) {
			const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
				...event,
				start: new Date(event.start),
				end: new Date(event.end),
			}));
			setEvents(parsedEvents);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("calendarEvents", JSON.stringify(events));
	}, [events]);

	return { events, setEvents };
};

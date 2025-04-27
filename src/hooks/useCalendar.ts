import { useState } from "react";

export const useCalendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [events, setEvents] = useState<Map<string, string[]>>(new Map());

	const nextMonth = () => {
		setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
	};

	const prevMonth = () => {
		setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
	};

	const addEvent = (date: Date, event: string) => {
		const dateString = date.toISOString().split("T")[0];
		setEvents((prevEvents) => {
			const updatedEvents = new Map(prevEvents);
			if (updatedEvents.has(dateString)) {
				updatedEvents.get(dateString)?.push(event);
			} else {
				updatedEvents.set(dateString, [event]);
			}
			return updatedEvents;
		});
	};

	return {
		currentDate,
		events,
		nextMonth,
		prevMonth,
		addEvent,
	};
};

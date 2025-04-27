import React from "react";
import { DayHeader, DayHeaderDate, EventItem, TimeLabel, TimeSlot, DayViewContainer } from "./styles";
import { Event } from "./types";
import { isSameDay } from "./utils";

interface DayViewProps {
	currentDate: Date;
	events: Event[];
	onEventClick: (event: Event) => void;
	onEventDragStart: (event: Event) => void;
	onSlotClick: (date: Date) => void;
}

export const DayView: React.FC<DayViewProps> = ({
	currentDate,
	events,
	onEventClick,
	onEventDragStart,
	onSlotClick,
}) => {
	const today = new Date();
	const date = new Date(currentDate);
	const timeSlots = [];

	for (let hour = 8; hour <= 20; hour++) {
		timeSlots.push(
			<TimeLabel key={`time-${hour}`}>
				{hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
			</TimeLabel>,
		);

		const slotDate = new Date(date);
		slotDate.setHours(hour, 0, 0, 0);

		timeSlots.push(<TimeSlot key={`slot-${hour}`} onClick={() => onSlotClick(slotDate)} />);
	}

	const eventsToRender = events.filter((event) => {
		return isSameDay(new Date(event.start), date);
	});

	const positionedEvents = eventsToRender.map((event) => {
		const start = new Date(event.start);
		const end = new Date(event.end);
		const startHour = start.getHours() + start.getMinutes() / 60;
		const durationHours = (end.getTime() - start.getTime()) / (60 * 60 * 1000);

		const top = (startHour - 8) * 60 + 40;
		const height = durationHours * 60;
		const left = "60px";
		const width = "calc(100% - 60px)";

		return (
			<EventItem
				key={event.id}
				color={event.color}
				style={{
					position: "absolute",
					top: `${top}px`,
					left,
					width,
					height: `${height}px`,
					zIndex: 10,
				}}
				onClick={(e) => {
					e.stopPropagation();
					onEventClick(event);
				}}
				draggable
				onDragStart={() => onEventDragStart(event)}
			>
				{event.title}
			</EventItem>
		);
	});

	return (
		<DayViewContainer>
			<DayHeader>
				<div>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}</div>
				<DayHeaderDate isToday={isSameDay(date, today)}>{date.getDate()}</DayHeaderDate>
			</DayHeader>
			{timeSlots}
			{positionedEvents}
		</DayViewContainer>
	);
};

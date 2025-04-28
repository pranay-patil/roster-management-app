import React from "react";
import { DayHeader, DayHeaderDate, EventItem, TimeLabel, TimeSlot, WeekDayWrapper, WeekViewContainer } from "./styles";
import { Event } from "./types";
import { isSameDay } from "./utils";

interface WeekViewProps {
	currentDate: Date;
	events: Event[];
	onEventClick: (event: Event) => void;
	onEventDragStart: (event: Event) => void;
	onSlotClick: (date: Date) => void;
}

const TIME_SLOT_HEIGHT = 60; // 60px = 1 hour block
const START_HOUR = 8;
const END_HOUR = 20;

export const WeekView: React.FC<WeekViewProps> = ({
	currentDate,
	events,
	onEventClick,
	onEventDragStart,
	onSlotClick,
}) => {
	const today = new Date();
	const startOfWeek = new Date(currentDate);
	startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

	const days = [];
	const timeSlots = [];

	for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
		timeSlots.push(
			<TimeLabel key={`time-${hour}`}>
				{(() => {
					const formattedHour = hour === 0 || hour === 12 ? 12 : hour % 12;
					const minutes = "00";
					const period = hour >= 12 ? "PM" : "AM";
					const hourString = formattedHour < 10 ? `0${formattedHour}` : `${formattedHour}`;
					return `${hourString}:${minutes} ${period}`;
				})()}
			</TimeLabel>,
		);

		for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
			const date = new Date(startOfWeek);
			date.setDate(startOfWeek.getDate() + dayOffset);
			date.setHours(hour, 0, 0, 0);

			timeSlots.push(<TimeSlot key={`slot-${dayOffset}-${hour}`} onClick={() => onSlotClick(date)} />);
		}
	}

	for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
		const date = new Date(startOfWeek);
		date.setDate(startOfWeek.getDate() + dayOffset);

		days.push(
			<DayHeader key={`header-${dayOffset}`}>
				<WeekDayWrapper>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOffset]}</WeekDayWrapper>
				<DayHeaderDate isToday={isSameDay(date, today)}>{date.getDate()}</DayHeaderDate>
			</DayHeader>,
		);
	}

	const eventsToRender = events.filter((event) => {
		const eventStart = new Date(event.start);
		return eventStart >= startOfWeek && eventStart < new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
	});

	const positionedEvents = eventsToRender.map((event) => {
		const start = new Date(event.start);
		const end = new Date(event.end);

		const dayOffset = (start.getDay() - startOfWeek.getDay() + 7) % 7;
		const startHour = start.getHours() + start.getMinutes() / 60;
		const durationHours = (end.getTime() - start.getTime()) / (60 * 60 * 1000);

		// No extra +40 now!
		const top = (startHour - 8) * 60;
		const height = durationHours * TIME_SLOT_HEIGHT;
		const left = `calc(60px + ${dayOffset * (100 / 7)}%)`;
		const width = `${100 / 7}%`;

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
		<WeekViewContainer>
			<div></div>
			{days}
			{timeSlots}
			{positionedEvents}
		</WeekViewContainer>
	);
};

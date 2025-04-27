import React from "react";
import { DayCell, DayHeader, DayHeaderDate, EventItem, MonthViewContainer } from "./styles";
import { Event } from "./types";
import { isSameDay, getDaysInMonth, getFirstDayOfMonth } from "./utils";

interface MonthViewProps {
	currentDate: Date;
	events: Event[];
	onEventClick: (event: Event) => void;
	onEventDragStart: (event: Event) => void;
	onDayClick: (date: Date) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
	currentDate,
	events,
	onEventClick,
	onEventDragStart,
	onDayClick,
}) => {
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = getDaysInMonth(year, month);
	const firstDayOfMonth = getFirstDayOfMonth(year, month);
	const today = new Date();

	const days = [];

	const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;
	const prevMonth = month === 0 ? 11 : month - 1;
	const prevMonthYear = month === 0 ? year - 1 : year;
	const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

	for (let i = 0; i < prevMonthDays; i++) {
		const date = new Date(prevMonthYear, prevMonth, daysInPrevMonth - prevMonthDays + i + 1);
		days.push(
			<DayCell
				key={`prev-${i}`}
				isCurrentMonth={false}
				isWeekend={date.getDay() === 0 || date.getDay() === 6}
				onClick={() => onDayClick(date)}
			>
				<DayHeader>
					<DayHeaderDate isToday={isSameDay(date, today)}>{date.getDate()}</DayHeaderDate>
				</DayHeader>
				{renderEventsForDay(date, events, onEventClick, onEventDragStart)}
			</DayCell>,
		);
	}

	for (let i = 1; i <= daysInMonth; i++) {
		const date = new Date(year, month, i);
		days.push(
			<DayCell
				key={`current-${i}`}
				isCurrentMonth={true}
				isWeekend={date.getDay() === 0 || date.getDay() === 6}
				onClick={() => onDayClick(date)}
			>
				<DayHeader>
					<DayHeaderDate isToday={isSameDay(date, today)}>{i}</DayHeaderDate>
				</DayHeader>
				{renderEventsForDay(date, events, onEventClick, onEventDragStart)}
			</DayCell>,
		);
	}

	const totalCells = prevMonthDays + daysInMonth;
	const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;

	for (let i = 1; i <= remainingCells; i++) {
		const date = new Date(year, month + 1, i);
		days.push(
			<DayCell
				key={`next-${i}`}
				isCurrentMonth={false}
				isWeekend={date.getDay() === 0 || date.getDay() === 6}
				onClick={() => onDayClick(date)}
			>
				<DayHeader>
					<DayHeaderDate isToday={isSameDay(date, today)}>{i}</DayHeaderDate>
				</DayHeader>
				{renderEventsForDay(date, events, onEventClick, onEventDragStart)}
			</DayCell>,
		);
	}

	return (
		<MonthViewContainer>
			{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
				<DayHeader key={day}>
					<div>{day}</div>
				</DayHeader>
			))}
			{days}
		</MonthViewContainer>
	);
};

const renderEventsForDay = (
	date: Date,
	events: Event[],
	onEventClick: (event: Event) => void,
	onEventDragStart: (event: Event) => void,
) => {
	return events
		.filter((event) => isSameDay(new Date(event.start), date))
		.map((event) => (
			<EventItem
				key={event.id}
				color={event.color}
				onClick={(e) => {
					e.stopPropagation();
					onEventClick(event);
				}}
				draggable
				onDragStart={() => onEventDragStart(event)}
			>
				{event.title}
			</EventItem>
		));
};

/* eslint-disable */
import styled from "@emotion/styled";
import { Event } from "@/types/calendar";
import { isSameDay } from "./utils";
import React, { useState, useEffect } from "react";
import { Video } from "lucide-react";
const getResponsiveColumnWidth = () => {
	const width = window.innerWidth;
	if (width < 480) return 80;
	if (width < 768) return 100;
	return 120;
};
const TIME_SLOT_HEIGHT = 60;
const START_HOUR = 8;
const END_HOUR = 20;
const DAY_COUNT = 7;
const TIME_LABEL_WIDTH = 60;
const COLUMN_WIDTH = 200;

const WeekViewContainer = styled.div`
	display: grid;
	grid-template-columns: ${TIME_LABEL_WIDTH}px repeat(${DAY_COUNT}, ${COLUMN_WIDTH}px);
	grid-auto-rows: ${TIME_SLOT_HEIGHT}px;
	position: relative;
	height: calc(${TIME_SLOT_HEIGHT}px * ${END_HOUR - START_HOUR + 1} + 50px);
	background: white;
	overflow-y: auto;
	overflow-x: auto;

	@media (max-width: 768px) {
		grid-template-columns: ${TIME_LABEL_WIDTH}px repeat(${DAY_COUNT}, 100px);
	}

	@media (max-width: 480px) {
		grid-template-columns: ${TIME_LABEL_WIDTH}px repeat(${DAY_COUNT}, 80px);
	}
`;

const WeekDayWrapper = styled.div`
	font-weight: 500;
	font-size: 12px;
	color: #9e9e9e;
`;

const TimeSlot = styled.div`
	height: ${TIME_SLOT_HEIGHT}px;
	border-bottom: 1px solid #ccc;
	border-right: 1px solid #ccc;
`;

const TimeLabel = styled.div`
	height: ${TIME_SLOT_HEIGHT}px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	padding-right: 8px;
	font-size: 12px;
	color: #70757a;
	border-bottom: 1px solid #ccc;
	border-right: 1px solid #ccc;
	width: ${TIME_LABEL_WIDTH}px;
`;

const EventItem = styled.div<{ color: string }>`
	background-color: ${(props) => props.color};
	color: white;
	padding: 2px 4px;
	border-radius: 4px;
	font-size: 12px;
	position: absolute;
	cursor: pointer;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: flex;
	align-items: center;
`;

const DayHeaderDate = styled.div<{ isToday: boolean }>`
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background-color: ${(props) => (props.isToday ? "#607447" : "none")};
	color: ${(props) => (props.isToday ? "white" : "inherit")};
	font-weight: ${(props) => (props.isToday ? "bold" : "normal")};
`;

const DayHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #e0e0e0;
	border-right: 1px solid #e0e0e0;
`;

interface WeekViewProps {
	currentDate: Date;
	events: Event[];
	onEventClick: (event: Event) => void;
	onEventDragStart: (event: Event) => void;
	onSlotClick: (date: Date) => void;
}

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
	const [columnWidth, setColumnWidth] = useState(getResponsiveColumnWidth());

	useEffect(() => {
		const handleResize = () => setColumnWidth(getResponsiveColumnWidth());
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const days = [];
	const timeSlots = [];

	for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
		const hourLabel = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour >= 12 ? "PM" : "AM"}`;

		timeSlots.push(<TimeLabel key={`time-${hour}`}>{hourLabel}</TimeLabel>);

		for (let day = 0; day < DAY_COUNT; day++) {
			const slotDate = new Date(startOfWeek);
			slotDate.setDate(slotDate.getDate() + day);
			slotDate.setHours(hour, 0, 0, 0);

			timeSlots.push(<TimeSlot key={`slot-${day}-${hour}`} onClick={() => onSlotClick(slotDate)} />);
		}
	}

	for (let day = 0; day < DAY_COUNT; day++) {
		const date = new Date(startOfWeek);
		date.setDate(startOfWeek.getDate() + day);

		days.push(
			<DayHeader key={`header-${day}`}>
				<WeekDayWrapper>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}</WeekDayWrapper>
				<DayHeaderDate isToday={isSameDay(date, today)}>{date.getDate()}</DayHeaderDate>
			</DayHeader>,
		);
	}

	const eventsToRender = events.filter((event) => {
		const start = new Date(event.start);
		return start >= startOfWeek && start < new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
	});

	const positionedEvents = eventsToRender.map((event) => {
		const start = new Date(event.start);
		const end = new Date(event.end);

		const dayOffset = (start.getDay() - startOfWeek.getDay() + 7) % 7;
		const startHour = start.getHours() + start.getMinutes() / 60 + 1;
		const endHour = end.getHours() + end.getMinutes() / 60 + 1;

		const top = (startHour - START_HOUR) * TIME_SLOT_HEIGHT;
		const height = (endHour - startHour) * TIME_SLOT_HEIGHT;
		const left = TIME_LABEL_WIDTH + dayOffset * COLUMN_WIDTH;

		return (
			<EventItem
				key={event.id}
				color={event.color}
				style={{ top, left, height, width: COLUMN_WIDTH - 4, zIndex: 10 }}
				onClick={(e) => {
					e.stopPropagation();
					onEventClick(event);
				}}
				draggable
				onDragStart={() => onEventDragStart(event)}
			>
				<div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
					<div>{event.title}</div>
					<Video />
				</div>
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

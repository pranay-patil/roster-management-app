/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useCalendarEvents } from "@/hooks/useCalensarEvent";
import { CalendarView, Event } from "@/types/calendar";
import {
	CalendarContainer,
	CalendarHeader,
	CalendarTitle,
	CalendarControls,
	CalendarButton,
	CalendarMain,
	CalendarContent,
	AddEventButton,
	EventModal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalClose,
	FormGroup,
	FormLabel,
	FormInput,
	FormTextarea,
	ColorPicker,
	ColorOption,
	ModalFooter,
	Button,
} from "./styles";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { DayView } from "./DayView";
import { LeftArrow } from "@/icons/LeftArrow";
import { RightArrowFilled } from "@/icons/RightArrow";
import { SelectField } from "../MultiPurpose/SelectField";
import { getWeekRangeString } from "./utils";
import styled from "@emotion/styled";
import { convertSlotsToEvents } from "@/utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { theme } from "@/styles/theme";

const eventColors = ["#4285f4", "#ea4335", "#fbbc04", "#34a853", "#673ab7", "#ff6d00"];

const SessionEvent = styled.div`
	width: 20px;
	height: 8px;
	border-radius: 8px;
	background: #757575;
	border-bottom: 1px solid #e0e0e0;
`;

const CalendarEvent = styled.div`
	width: 20px;
	height: 8px;
	border-radius: 8px;
	background: #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
`;

const Label = styled.label`
	font-size: 10px;
	font-weight: 500;
	letter-spacing: 0%;
	text-align: center;
	margin-top: -4px;
`;
export const Calendar: React.FC = () => {
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [view, setView] = useState<CalendarView>("week");
	const { events, setEvents } = useCalendarEvents();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [newEvent, setNewEvent] = useState<Partial<Event>>({
		title: "",
		start: new Date(),
		end: new Date(new Date().getTime() + 60 * 60 * 1000),
		color: "#4285f4",
		description: "",
	});
	const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);

	const roster = useSelector((state: RootState) => state.roster.roster);

	useEffect(() => {
		const bookedEvent = convertSlotsToEvents(currentDate as any, roster[0].availabilities[0], theme) as any;
		setEvents(bookedEvent);
	}, [currentDate]);

	const goToPrevious = () => {
		const newDate = new Date(currentDate);
		if (view === "month") {
			newDate.setMonth(newDate.getMonth() - 1);
		} else if (view === "week") {
			newDate.setDate(newDate.getDate() - 7);
		} else {
			newDate.setDate(newDate.getDate() - 1);
		}
		setCurrentDate(newDate);
	};

	const goToNext = () => {
		const newDate = new Date(currentDate);
		if (view === "month") {
			newDate.setMonth(newDate.getMonth() + 1);
		} else if (view === "week") {
			newDate.setDate(newDate.getDate() + 7);
		} else {
			newDate.setDate(newDate.getDate() + 1);
		}
		setCurrentDate(newDate);
	};

	const handleAddEvent = () => {
		setSelectedEvent(null);
		setNewEvent({
			title: "",
			start: new Date(),
			end: new Date(new Date().getTime() + 60 * 60 * 1000),
			color: "#4285f4",
			description: "",
		});
		setShowModal(true);
	};

	const handleEditEvent = (event: Event) => {
		setSelectedEvent(event);
		setNewEvent({
			...event,
			start: new Date(event.start),
			end: new Date(event.end),
		});
		setShowModal(true);
	};

	const handleSaveEvent = () => {
		if (!newEvent.title || !newEvent.start || !newEvent.end || !newEvent.color) return;

		const eventToSave: Event = {
			id: selectedEvent ? selectedEvent.id : Date.now().toString(),
			title: newEvent.title,
			start: new Date(newEvent.start),
			end: new Date(newEvent.end),
			color: newEvent.color,
			description: newEvent.description || "",
		};

		if (selectedEvent) {
			setEvents(events.map((e) => (e.id === selectedEvent.id ? eventToSave : e)));
		} else {
			setEvents([...events, eventToSave]);
		}

		setShowModal(false);
	};

	const handleDeleteEvent = () => {
		if (selectedEvent) {
			setEvents(events.filter((e) => e.id !== selectedEvent.id));
			setShowModal(false);
		}
	};

	const handleEventDragStart = (event: Event) => {
		setDraggedEvent(event);
	};

	const handleEventDrop = (date: Date) => {
		if (!draggedEvent) return;

		const duration = draggedEvent.end.getTime() - draggedEvent.start.getTime();
		const newStart = new Date(date);
		const newEnd = new Date(newStart.getTime() + duration);

		const updatedEvent = {
			...draggedEvent,
			start: newStart,
			end: newEnd,
		};

		setEvents(events.map((e) => (e.id === draggedEvent.id ? updatedEvent : e)));
		setDraggedEvent(null);
	};

	return (
		<CalendarContainer>
			<CalendarHeader>
				<div style={{ display: "flex", gap: "16px" }}>
					<CalendarButton onClick={goToPrevious}>
						<div>
							<LeftArrow />
						</div>
					</CalendarButton>
					<CalendarButton onClick={goToNext}>
						<div>
							<RightArrowFilled />
						</div>
					</CalendarButton>
					<CalendarTitle>{getWeekRangeString(currentDate)}</CalendarTitle>
				</div>
				<CalendarControls>
					<div style={{ display: "flex", gap: "8px" }}>
						<SessionEvent></SessionEvent>
						<Label>Session Event</Label>
					</div>
					<div style={{ display: "flex", gap: "8px" }}>
						<CalendarEvent></CalendarEvent>
						<Label>Calendar Event</Label>
					</div>
					<div>
						<SelectField
							optionList={[
								{ id: "month", name: "Month", disabled: true },
								{ id: "week", name: "Week" },
								{ id: "day", name: "Day", disabled: true },
							]}
							defaultValue={view}
							onSelectionChange={(value) => {
								setView(value as CalendarView);
							}}
						></SelectField>
					</div>
				</CalendarControls>
			</CalendarHeader>

			<CalendarMain>
				<CalendarContent>
					{view === "month" && (
						<MonthView
							currentDate={currentDate}
							events={events}
							onEventClick={handleEditEvent}
							onEventDragStart={handleEventDragStart}
							onDayClick={handleEventDrop}
						/>
					)}
					{view === "week" && (
						<WeekView
							currentDate={currentDate}
							events={events}
							onEventClick={handleEditEvent}
							onEventDragStart={handleEventDragStart}
							onSlotClick={(date) => {
								setNewEvent((prev) => ({
									...prev,
									start: date,
									end: new Date(date.getTime() + 60 * 60 * 1000),
								}));
								setSelectedEvent(null);
								setShowModal(true);
							}}
						/>
					)}
					{view === "day" && (
						<DayView
							currentDate={currentDate}
							events={events}
							onEventClick={handleEditEvent}
							onEventDragStart={handleEventDragStart}
							onSlotClick={(date) => {
								setNewEvent((prev) => ({
									...prev,
									start: date,
									end: new Date(date.getTime() + 60 * 60 * 1000),
								}));
								setSelectedEvent(null);
								setShowModal(true);
							}}
						/>
					)}
				</CalendarContent>
			</CalendarMain>

			<AddEventButton onClick={handleAddEvent}>+</AddEventButton>

			{showModal && (
				<EventModal onClick={() => setShowModal(false)}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<ModalHeader>
							<ModalTitle>{selectedEvent ? "Edit Event" : "Add Event"}</ModalTitle>
							<ModalClose onClick={() => setShowModal(false)}>×</ModalClose>
						</ModalHeader>

						<FormGroup>
							<FormLabel>Title</FormLabel>
							<FormInput
								type="text"
								value={newEvent.title || ""}
								onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel>Start</FormLabel>
							<FormInput
								type="datetime-local"
								value={
									newEvent.start
										? new Date(
												newEvent.start.getTime() - newEvent.start.getTimezoneOffset() * 60000,
										  )
												.toISOString()
												.slice(0, 16)
										: ""
								}
								onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel>End</FormLabel>
							<FormInput
								type="datetime-local"
								value={
									newEvent.end
										? new Date(newEvent.end.getTime() - newEvent.end.getTimezoneOffset() * 60000)
												.toISOString()
												.slice(0, 16)
										: ""
								}
								onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel>Description</FormLabel>
							<FormTextarea
								value={newEvent.description || ""}
								onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel>Color</FormLabel>
							<ColorPicker>
								{eventColors.map((color) => (
									<ColorOption
										key={color}
										color={color}
										selected={newEvent.color === color}
										onClick={() => setNewEvent({ ...newEvent, color })}
									/>
								))}
							</ColorPicker>
						</FormGroup>

						<ModalFooter>
							{selectedEvent && <Button onClick={handleDeleteEvent}>Delete</Button>}
							<Button onClick={() => setShowModal(false)}>Cancel</Button>
							<Button primary onClick={handleSaveEvent}>
								Save
							</Button>
						</ModalFooter>
					</ModalContent>
				</EventModal>
			)}
		</CalendarContainer>
	);
};

export default Calendar;

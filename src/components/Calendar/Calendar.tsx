/* eslint-disable */
import React, { useState, useRef } from "react";
import { useCalendarEvents } from "./hooks";
import { CalendarView, Event } from "./types";
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

const eventColors = ["#4285f4", "#ea4335", "#fbbc04", "#34a853", "#673ab7", "#ff6d00"];

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
	const calendarRef = useRef<HTMLDivElement>(null);

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
					<div>
						<div></div>
						<label>Session Event</label>
					</div>
					<div>
						<div></div>
						<label>Calendar Event</label>
					</div>
					<SelectField
						optionList={[
							{ id: "month", name: "Month" },
							{ id: "week", name: "Week" },
							{ id: "day", name: "Day" },
						]}
						defaultValue={view}
						onSelectionChange={(value) => {
							setView(value as CalendarView);
						}}
					></SelectField>
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

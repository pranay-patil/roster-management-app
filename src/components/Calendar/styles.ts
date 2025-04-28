import styled from "@emotion/styled";

export const CalendarContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	font-family: "Roboto", sans-serif;
`;

export const CalendarHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
`;

export const CalendarTitle = styled.h1`
	font-size: 22px;
	font-weight: 600;
	margin: 0;
	color: #4c4c4c;
`;

export const CalendarControls = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const CalendarButton = styled.button`
	background: none;
	border: none;
	padding: 8px 12px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
	display: flex;
	align-items: center;
	gap: 8px;
	color: #3c4043;
	width: 32px;
	height: 32px;
	gap: 8px;
	border-radius: 40px;
	padding: 4px;
	border-width: 1px;
	border: 1px solid #e0e0e0;
	&:hover {
		background-color: #f1f3f4;
	}
	&:active {
		background-color: #e8eaed;
	}
`;

export const CalendarMain = styled.div`
	display: flex;
	flex: 1;
	overflow: hidden;
`;

export const CalendarContent = styled.div`
	flex: 1;
	overflow: auto;
`;

export const MonthViewContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: auto repeat(6, 1fr);
	height: 100%;
`;

export const WeekViewContainer = styled.div`
	display: grid;
	grid-template-columns: 80px repeat(7, 1fr); /* Notice: updated first column to 80px (matches your TimeLabel width) */
	grid-auto-rows: 60px; /* Each row is 60px tall (matches your TimeSlot and TimeLabel) */
	position: relative; /* <-- Important: relative positioning for absolute children */
	height: calc(60px * 13 + 50px); /* 13 hours (8 AM to 8 PM) + extra for header */
	background: white;
	overflow-y: auto;
`;

export const DayViewContainer = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr;
	grid-template-rows: auto 1fr;
	height: 100%;
`;

export const DayHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 8px;
	border-bottom: 1px solid #e0e0e0;
	border-right: 1px solid #e0e0e0;
`;

export const DayHeaderDate = styled.div<{ isToday: boolean }>`
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

export const DayCell = styled.div<{ isCurrentMonth: boolean; isWeekend: boolean }>`
	border-right: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
	padding: 4px;
	min-height: 100px;
	background-color: ${(props) => (props.isWeekend ? "#f8f9fa" : "white")};
	color: ${(props) => (props.isCurrentMonth ? "#3c4043" : "#9aa0a6")};
`;

export const EventItem = styled.div<{ color: string }>`
	background-color: ${(props) => props.color};
	color: white;
	padding: 2px 4px;
	margin: 2px 0;
	border-radius: 4px;
	font-size: 12px;
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const TimeSlot = styled.div`
	height: 60px;
	border-bottom: 1px solid #e0e0e0;
	border-bottom: 1px solid #ccc;
	border-right: 1px solid #ccc;
`;

export const TimeLabel = styled.div`
	height: 60px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	padding-right: 8px;
	font-size: 12px;
	color: #70757a;
	border-bottom: 1px solid #ccc;
	border-right: 1px solid #ccc;
	width: 80px;
`;

export const EventModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

export const ModalContent = styled.div`
	background-color: white;
	border-radius: 8px;
	width: 480px;
	max-width: 90%;
	padding: 24px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

export const ModalTitle = styled.h2`
	margin: 0;
	font-size: 20px;
	font-weight: 500;
`;

export const ModalClose = styled.button`
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
	color: #5f6368;
`;

export const FormGroup = styled.div`
	margin-bottom: 16px;
`;

export const FormLabel = styled.label`
	display: block;
	margin-bottom: 8px;
	font-size: 14px;
	color: #5f6368;
`;

export const FormInput = styled.input`
	width: 100%;
	padding: 8px 12px;
	border: 1px solid #dadce0;
	border-radius: 4px;
	font-size: 14px;
	&:focus {
		border-color: #607447;
		outline: none;
	}
`;

export const FormTextarea = styled.textarea`
	width: 100%;
	padding: 8px 12px;
	border: 1px solid #dadce0;
	border-radius: 4px;
	font-size: 14px;
	min-height: 100px;
	resize: vertical;
	&:focus {
		border-color: #607447;
		outline: none;
	}
`;

export const ColorPicker = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 8px;
`;

export const ColorOption = styled.div<{ color: string; selected: boolean }>`
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	cursor: pointer;
	border: ${(props) => (props.selected ? "2px solid #607447" : "none")};
`;

export const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	margin-top: 24px;
`;

export const Button = styled.button<{ primary?: boolean }>`
	padding: 8px 16px;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	font-size: 14px;
	background-color: ${(props) => (props.primary ? "#607447" : "#f1f3f4")};
	color: ${(props) => (props.primary ? "white" : "#3c4043")};
	&:hover {
		background-color: ${(props) => (props.primary ? "#1765cc" : "#e8eaed")};
	}
`;

export const AddEventButton = styled.button`
	position: fixed;
	bottom: 24px;
	right: 24px;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	background-color: #1a73e8;
	color: white;
	border: none;
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	z-index: 100;
	&:hover {
		background-color: #1765cc;
	}
`;

export const WeekDayWrapper = styled.div`
	font-weight: 500;
	letter-spacing: 0%;
	color: #9e9e9e;
	font-size: 12px;
`;

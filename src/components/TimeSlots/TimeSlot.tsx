import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

type SlotType =
	| "online_slots"
	| "offline_slots"
	| "both_slots"
	| "online_booked_slots"
	| "offline_booked_slots"
	| "blocked_slots"
	| "empty";

interface TimeSlotProps {
	time: string;
	availabilities: Availability;
}

interface Availability {
	online_slots: string[];
	offline_slots: string[];
	both_slots: string[];
	online_booked_slots: string[];
	offline_booked_slots: string[];
	blocked_slots: { slot: string; reason: string }[];
}

export const getSlotType = (time: string, availability: Availability): SlotType => {
	if (availability.blocked_slots.some((b) => b.slot === time)) return "blocked_slots";
	if (availability.online_booked_slots.includes(time)) return "online_booked_slots";
	if (availability.offline_booked_slots.includes(time)) return "offline_booked_slots";
	if (availability.both_slots.includes(time)) return "both_slots";
	if (availability.online_slots.includes(time)) return "online_slots";
	if (availability.offline_slots.includes(time)) return "offline_slots";

	return "empty";
};

const Slot = styled.div<{ type: SlotType }>`
	background-color: ${({ type }) => (type === "empty" ? theme.colors.grey : theme.colors[type])};
	color: ${({ type }) => (type === "empty" ? "#999" : "#fff")};
	border-radius: 8px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	width: 64px;
	height: 28px;
	border-radius: 8px;
	padding-top: 4px;
	padding-right: 8px;
	padding-bottom: 4px;
	padding-left: 8px;
	margin-right: 10px;
	margin-bottom: 10px;
`;

export const TimeSlot = ({ time, availabilities }: TimeSlotProps) => {
	return <Slot type={getSlotType(time, availabilities)}>{time}</Slot>;
};

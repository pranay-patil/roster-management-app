import styled from "@emotion/styled";
import { FC, useState } from "react";
import dayjs from "dayjs";
import { LeftArrow } from "@/icons/LeftArrow";
import { RightArrowFilled } from "@/icons/RightArrow";

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
	width: 100%;
`;

const NavButton = styled.button`
	border-radius: 6px;
	cursor: pointer;
	font-weight: bold;
	width: 32;
	height: 32;
	gap: 8px;
	border-radius: 50%;
	padding: 4px;
	border-width: 1px;
	border: 1px solid #e0e0e0;
	:hover {
		background-color: #d0d0d0;
	}
`;

const DaysWrapper = styled.div`
	display: flex;
	gap: 8px;
	width: 100%;
	justify-content: space-between;
`;

const DayButton = styled.button<{ selected?: boolean }>`
	padding: 8px 12px;
	border-radius: 8px;
	background-color: ${({ selected }) => (selected ? "#4E6137" : "#ffffff")};
	cursor: pointer;
	white-space: nowrap;
	font-family: amahafont;
	height: 48px;
	border-radius: 8px;
	padding-top: 4px;
	padding-right: 8px;
	padding-bottom: 4px;
	padding-left: 8px;
	border-width: 1px;
	width: 13%;
	margin-left: 10px;
	margin-right: 10px;
	border: 1px solid #e0e0e0;
	justify-content: center;
	align-items: center;
`;

const Date = styled.div<{ selected?: boolean }>`
	color: ${({ selected }) => (selected ? "#fff" : "#4C4C4C")};
	font-weight: 600;
	font-size: 14px;
	letter-spacing: 0%;
`;

const Day = styled.div<{ selected?: boolean }>`
	font-weight: 600;
	font-size: 10px;
	letter-spacing: 0%;
	color: ${({ selected }) => (selected ? "#fff" : "#9E9E9E")};
`;

interface CalendarHeaderProps {
	onDayChange: (day: string) => void;
}

export const CalendarHeader: FC<CalendarHeaderProps> = ({ onDayChange }) => {
	const [weekStart, setWeekStart] = useState(dayjs().startOf("week")); // Sunday
	const [selectedDay, setSelectedDay] = useState(dayjs().format("YYYY-MM-DD"));

	const generateWeekDays = () => {
		const days = [];
		for (let i = 0; i < 7; i++) {
			const date = weekStart.add(i, "day");
			days.push({
				day: date.format("ddd"), // e.g., Sun 21
				date: date.format("DD"),
				value: date.format("YYYY-MM-DD"), // for internal matching
			});
		}
		return days;
	};

	const goToPrevWeek = () => setWeekStart((prev) => prev.subtract(7, "day"));
	const goToNextWeek = () => setWeekStart((prev) => prev.add(7, "day"));

	const handleDayClick = (day: string) => {
		setSelectedDay(day);
		onDayChange(day);
	};
	return (
		<Header>
			<NavButton onClick={goToPrevWeek}>
				<LeftArrow />
			</NavButton>

			<DaysWrapper>
				{generateWeekDays().map((day, index) => (
					<DayButton
						key={index}
						selected={selectedDay === day.value}
						onClick={() => handleDayClick(day.value)}
					>
						<div>
							<Day selected={selectedDay === day.value}>{day.day}</Day>
							<Date selected={selectedDay === day.value}>{day.date}</Date>
						</div>
					</DayButton>
				))}
			</DaysWrapper>

			<NavButton onClick={goToNextWeek}>
				<RightArrowFilled />
			</NavButton>
		</Header>
	);
};

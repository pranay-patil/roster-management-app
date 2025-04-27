import styled from "@emotion/styled";
import { TimeSlot } from "./TimeSlot";
import { FC, useRef } from "react";
import { HomeIcon } from "../icons/Home"; // Assuming you have a HomeIcon component
import { VideoIcon } from "@/icons/VideoIcon";
import { RightArrow, RightArrowFilled } from "@/icons/RightArrow";
import { LeftArrow } from "@/icons/LeftArrow";
import { Availability } from "@/redux/roster/types";
const Card = styled.div`
	margin-bottom: 32px;
	display: flex;
	width: 100%;
	margin-top: 32px;
`;

const Info = styled.div`
	align-items: center;
	gap: 8px;
	margin-bottom: 12px;
	width: 15%;
`;

const Avatar = styled.img`
	width: 64px;
	height: 64px;
	border-radius: 64px;
`;

const Name = styled.div`
	font-weight: bold;
	font-family: amahafont;
	font-weight: 600;
	font-size: size/h5;
	line-height: line-height/h5;
	letter-spacing: 0%;
	text-decoration: underline;
	text-decoration-style: solid;
	text-decoration-offset: 0%;
	text-decoration-thickness: 0%;
	color: rgba(96, 116, 71, 1);
	width: 160;
	height: 24;
	margin-top: 8px;
`;

const ScrollWrapper = styled.div`
	position: relative;
	border-radius: 8px;
	width: 85%;
	height: 100%;
`;

const ScrollableContainer = styled.div`
	overflow-x: auto;
	white-space: nowrap;
	padding-bottom: 8px;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const TimeSlotsGrid = styled.div`
	display: grid;
	grid-template-rows: repeat(4, auto);
	grid-auto-flow: column;
	gap: 8px;
	width: 100%;
	border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
	height: 185px;
	padding: 8px 50px;
`;

const ArrowButton = styled.button<{ direction: "left" | "right" }>`
	position: absolute;
	${({ direction }) => (direction === "left" ? "left: 0;" : "right: 0;")}
	background-color: #fff;
	border: 1px solid #e0e0e0;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 185px;
	width: 40px;
	:hover {
		background-color: #f7f7f7;
	}
`;

const CalendarViewText = styled.div`
	font-family: amahafont;
	font-weight: 600;
	letter-spacing: 0%;
	text-decoration: underline;
	text-decoration-style: solid;
	text-decoration-offset: 0%;
	text-decoration-thickness: 0%;
	color: #e76943;
	cursor: pointer;
`;
const IconsWrapper = styled.div`
	display: flex;
	margin-top: 8px;
`;

const CalendarText = styled.div`
	border-radius: 8px;
	padding-top: 8px;
	padding-bottom: 8px;
	display: flex;
	margin-top: 16px;
	& > svg {
		margin-top: 8px;
		margin-left: 8px;
	}
`;

const IconWrapper = styled.div`
	width: 44px;
	height: 24px;
	gap: 4px;
	border-radius: 8px;
	padding-top: 2px;
	padding-right: 8px;
	padding-bottom: 2px;
	padding-left: 8px;
	background: #f7f7f7;
	display: flex;
`;

const NumberWrapper = styled.div`
	font-weight: 500;
	letter-spacing: 0%;
	color: #4c4c4c;
	font-size: 12px;
`;

interface ProviderCardProps {
	name: string;
	providerUsertype: string;
	isInHouse: boolean;
	id: number;
	image: string;
	clinicDetails: {
		id: string;
		name: string;
	};
	availabilities: Availability[];
	toggleView?: (view: string) => void;
}
export const ProviderCard: FC<ProviderCardProps> = ({ name, image, availabilities, toggleView = () => {} }) => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const generateTimeSlots = () => {
		const slots = [];
		let hour = 8;
		let minute = 0;

		while (hour < 24 || (hour === 23 && minute === 0)) {
			const formattedHour = hour.toString().padStart(2, "0");
			const formattedMinute = minute.toString().padStart(2, "0");
			slots.push({
				time: `${formattedHour}:${formattedMinute}`,
				type: "empty",
			});

			minute += 15;
			if (minute === 60) {
				minute = 0;
				hour++;
			}
		}
		return slots;
	};

	const timeSlots = generateTimeSlots();

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = 300;
			scrollRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<Card>
			<Info>
				<Avatar src={image} />
				<Name>{name}</Name>
				<IconsWrapper>
					<IconWrapper>
						<HomeIcon />
						<NumberWrapper>5</NumberWrapper>
					</IconWrapper>
					<IconWrapper>
						<VideoIcon />
						<NumberWrapper>5</NumberWrapper>
					</IconWrapper>
				</IconsWrapper>
				<CalendarText>
					<CalendarViewText
						onClick={() => {
							toggleView("calendar");
						}}
					>
						View Calendar
					</CalendarViewText>
					<RightArrow fill={"#e76943"} />
				</CalendarText>
			</Info>

			<ScrollWrapper>
				<ArrowButton direction="left" onClick={() => scroll("left")}>
					<LeftArrow />
				</ArrowButton>

				<ArrowButton direction="right" onClick={() => scroll("right")}>
					<RightArrowFilled />
				</ArrowButton>

				<ScrollableContainer ref={scrollRef}>
					<TimeSlotsGrid>
						{timeSlots.map((slot, index) => (
							<TimeSlot key={index} time={slot.time} availabilities={availabilities[0]} />
						))}
					</TimeSlotsGrid>
				</ScrollableContainer>
			</ScrollWrapper>
		</Card>
	);
};

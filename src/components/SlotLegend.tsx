import styled from "@emotion/styled";
import { theme } from "../styles/theme"; // assuming you have colors there

const LegendContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* Max 3 per row, but responsive */
	gap: 12px;
	margin-top: 16px;
`;

const LegendItem = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const ColorDot = styled.div<{ color: string }>`
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: ${({ color }) => color};
`;

const Label = styled.span`
	font-size: 14px;
	color: #333;
	white-space: nowrap;
`;

const slotTypes = [
	{ label: "Online", color: theme.colors.online_slots },
	{ label: "Offline", color: theme.colors.offline_slots },
	{ label: "Online+Offline", color: theme.colors.both_slots },
	{ label: "Online Booked", color: theme.colors.online_booked_slots },
	{ label: "Offline Booked", color: theme.colors.offline_booked_slots },
	{ label: "Blocked", color: theme.colors.blocked_slots },
];

export const SlotLegend = () => {
	return (
		<LegendContainer>
			{slotTypes.map((slot, index) => (
				<LegendItem key={index}>
					<ColorDot color={slot.color} />
					<Label>{slot.label}</Label>
				</LegendItem>
			))}
		</LegendContainer>
	);
};

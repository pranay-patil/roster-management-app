import { FC } from "react";

interface IconProps {
	width?: number;
	height?: number;
	stroke?: string;
}

const DoubleChevronIcon: FC<IconProps> = ({ width = 24, height = 24, stroke = "#4C4C4C" }) => (
	<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M11 17L6 12L11 7" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M18 17L13 12L18 7" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default DoubleChevronIcon;

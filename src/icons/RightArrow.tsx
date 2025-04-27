export const RightArrow = ({ fill = "none" }) => {
	return (
		<svg width="6" height="10" viewBox="0 0 6 10" fill={"none"} xmlns="http://www.w3.org/2000/svg">
			<path d="M1 9L5 5L1 1" stroke={fill} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	);
};

export const RightArrowFilled = () => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10 16L14 12L10 8"
				stroke="#757575"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

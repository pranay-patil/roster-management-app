export const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
	return new Date(year, month, 1).getDay();
};

export const isSameDay = (date1: Date, date2: Date) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

export const getWeekRangeString = (current: Date) => {
	const start = new Date(current);
	start.setDate(current.getDate() - current.getDay());

	const end = new Date(start);
	end.setDate(start.getDate() + 6);

	const pad = (num: number) => num.toString().padStart(2, "0");

	const startDay = pad(start.getDate());
	const endDay = pad(end.getDate());
	const monthShort = start.toLocaleString("default", { month: "short" });
	const year = start.getFullYear();

	return `${startDay}-${endDay} ${monthShort} ${year}`;
};

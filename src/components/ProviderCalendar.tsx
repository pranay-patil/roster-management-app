import styled from "@emotion/styled";
import { SidebarFilters } from "./SidebarFilters";
import { CalendarHeader } from "./CalendarHeader";
import { ProviderCard } from "./ProviderCard";
import Header from "./Header/Header";
import { SlotLegend } from "./SlotLegend";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchRoster } from "@/redux/roster/rosterSlice";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CalendarPage from "./Calendar/Calendar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Container = styled.div`
	display: flex;
	width: 100%;
`;

const CalendarSection = styled.div`
	flex: 1;
	padding: 16px;
	width: 20%;
`;

const CalendarHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const CalendarHeader1 = styled.div`
	font-family: amahafont;
	font-weight: 600;
	font-size: size/h3;
	line-height: line-height/h3;
	letter-spacing: 0%;
	color: #4c4c4c;
`;

const CalendarHeader2 = styled.div`
	font-family: amahafont;
	font-weight: 400;
	font-size: size/h6;
	line-height: line-height/h6;
	letter-spacing: 0%;
	color: #757575;
`;

const CalendarHeaaderWrapprer = styled.div`
	width: 508px;
	gap: 4px;
`;

const LegendContainer = styled.div`
	width: 508px;
	gap: 24px;
`;
export const ProviderCalendar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const roster = useSelector((state: RootState) => state.roster.roster);
	const originalRoster = useSelector((state: RootState) => state.roster.originalRoster);
	const status = useSelector((state: RootState) => state.roster.status);
	const [view, setView] = useState<string>("slot");
	const [isHidden, setHidden] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState("");

	const handleDateChange = (date: string) => {
		setSelectedDate(date);
	};
	useEffect(() => {
		dispatch(fetchRoster());
	}, [dispatch]);

	const toggleView = (value: string) => {
		setView(value);
	};

	const handleSideBarToggle = () => {
		setHidden(!isHidden);
	};

	return (
		<>
			<Header view={view} isHidden={isHidden} toggleView={toggleView} handleSideBarToggle={handleSideBarToggle} />
			<Container>
				<SidebarFilters roster={originalRoster} isHidden={isHidden} />
				{view === "slot" && (
					<CalendarSection>
						<CalendarHeader onDayChange={handleDateChange} />
						<CalendarHeaderContainer>
							<CalendarHeaaderWrapprer>
								<CalendarHeader1>{`Showing full schedules for ${dayjs(selectedDate).format(
									"ddd, DD MMM YYYY",
								)} `}</CalendarHeader1>
								<CalendarHeader2> Showing slots in the 8 am to 12 am</CalendarHeader2>
							</CalendarHeaaderWrapprer>
							<LegendContainer>
								<SlotLegend />
							</LegendContainer>
						</CalendarHeaderContainer>
						{status === "loading" ? (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "50vh",
								}}
							>
								<CircularProgress />
							</Box>
						) : (
							roster.map((item) => (
								<ProviderCard
									name={item.name}
									providerUsertype={item.provider_usertype}
									isInHouse={item.is_inhouse}
									id={item.id}
									image={item.image}
									clinicDetails={{
										...item.clinic_details,
										id: item.clinic_details.id.toString(),
									}}
									availabilities={item.availabilities}
									key={item.id}
									toggleView={toggleView}
								/>
							))
						)}
					</CalendarSection>
				)}
				{view === "calendar" && (
					<CalendarSection>
						<CalendarPage />
					</CalendarSection>
				)}
			</Container>
		</>
	);
};

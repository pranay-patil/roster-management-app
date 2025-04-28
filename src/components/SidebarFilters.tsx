/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import styled from "@emotion/styled";
import { useMediaQuery, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { SelectField } from "./MultiPurpose/SelectField";
import { SearchField } from "./MultiPurpose/SearchFeild";
import { RosterItem } from "@/redux/roster/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { filterProviders } from "@/redux/roster/rosterSlice";

const SidebarContainer = styled.div<{ isMobile: boolean; isOpen: boolean ; isHidden: boolean }>`
	display: ${({ isHidden }) => (isHidden ? "none" : "block")};
	position: ${({ isMobile }) => (isMobile ? "fixed" : "relative")};
	top: 0;
	left: 0;
	bottom: 0;
	width: ${({ isMobile }) => (isMobile ? "80%" : "20%")};
	background-color: white;
	padding: 16px;
	border-right: 1px solid #eee;
	transform: ${({ isMobile, isOpen }) => (isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)")};
	transition: transform 0.3s ease-in-out;
	z-index: 1000;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
	display: ${({ isOpen }) => (isOpen ? "block" : "none")};
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	z-index: 999;
`;

const ResetButton = styled.button`
	width: 87px;
	height: 40px;
	gap: 4px;
	border-radius: 8px;
	padding: 8px 24px;
	background: #fff5f2;
	font-family: amahafont;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: 0%;
	color: #e76943;
	border: 1px solid #fff5f2;
	cursor: pointer;
`;

const ApplyButton = styled.button`
	width: 88px;
	height: 40px;
	gap: 4px;
	border-radius: 8px;
	padding: 8px 24px;
	background: #e76943;
	font-family: amahafont;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: 0%;
	color: #ffffff;
	cursor: pointer;
`;

const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
`;

const Note = styled.p`
	font-size: 14px;
	color: #4c4c4c;
	font-family: amahafont;
	font-weight: 500;
	letter-spacing: 0%;
`;

const ButtonsContainer = styled.div`
	display: flex;
	gap: 16px;
`;

const ToggleButton = styled(IconButton)`
	position: fixed;
	top: 16px;
	left: 16px;
	z-index: 1100;
	background-color: white;
	border: 1px solid #ccc;
`;

interface SidebarFiltersProps {
	roster: RosterItem[];
	isHidden: boolean;
}

export const SidebarFilters: FC<SidebarFiltersProps> = ({ roster , isHidden}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [filter, setFilter] = useState({ provider_usertype: "0", is_inhouse: "0", clinic_details: "0" });
	const dispatch = useDispatch<AppDispatch>();
	const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile); // Open by default on desktop

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const listOfTherapists = [
		{ id: "0", name: "All services" },
		...(roster?.reduce((acc: { id: string; name: string }[], therapist: RosterItem) => {
			const alreadyExists = acc.some((item) => item.name === therapist.provider_usertype);
			if (!alreadyExists) {
				acc.push({
					id: therapist.id.toString(),
					name: therapist.provider_usertype,
				});
			}
			return acc;
		}, []) || []),
	];

	const listOfCenters = [
		{ id: "0", name: "All centers" },
		...(roster?.reduce((acc: { id: string; name: string }[], therapist: RosterItem) => {
			const alreadyExists = acc.some((item) => Number(item.id) === Number(therapist.clinic_details.id));
			if (!alreadyExists) {
				acc.push({
					id: therapist.clinic_details.id.toString(),
					name: therapist.clinic_details.name,
				});
			}
			return acc;
		}, []) || []),
	];

	const listOfTypes = [
		{ id: "0", name: "All types" },
		{ id: "1", name: "In House" },
		{ id: "2", name: "Online" },
	];

	const handleSelectionChange = (value: string, type: string) => {
		setFilter((prevFilter) => ({
			...prevFilter,
			[type]: value,
		}));
	};

	const handleApply = () => {
		console.log("Filter applied:", filter);
		dispatch(filterProviders(filter));
	};

	const handleReset = () => {
		setFilter({ provider_usertype: "0", is_inhouse: "0", clinic_details: "0" });
		dispatch(filterProviders({ provider_usertype: "0", is_inhouse: "0", clinic_details: "0" }));
	};

	return (
		<>
			{isMobile && (
				<ToggleButton onClick={toggleSidebar}>{isSidebarOpen ? <CloseIcon /> : <MenuIcon />}</ToggleButton>
			)}
			<Overlay isOpen={isSidebarOpen && isMobile} onClick={toggleSidebar} />
			<SidebarContainer isMobile={isMobile} isOpen={isSidebarOpen} isHidden={isHidden}>
				<FlexBox>
					<SelectField
						type="provider_usertype"
						optionList={listOfTherapists}
						defaultValue={filter.provider_usertype}
						onSelectionChange={handleSelectionChange}
					/>
					<SelectField
						type="is_inhouse"
						optionList={listOfTypes}
						defaultValue={filter.is_inhouse}
						onSelectionChange={handleSelectionChange}
					/>
					<SelectField
						type="clinic_details"
						optionList={listOfCenters}
						defaultValue={filter.clinic_details}
						onSelectionChange={handleSelectionChange}
					/>
					<ButtonsContainer>
						<ResetButton onClick={handleReset}>Reset</ResetButton>
						<ApplyButton onClick={handleApply}>Apply</ApplyButton>
					</ButtonsContainer>
					<SearchField />
					<Note>You can search up to 5 providers to view their availability.</Note>
				</FlexBox>
			</SidebarContainer>
		</>
	);
};

/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SelectField } from "./MultiPurpose/SelectField";
import { SearchField } from "./MultiPurpose/SearchFeild";
import { RosterItem } from "@/redux/roster/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { filterProviders } from "@/redux/roster/rosterSlice";
const SidebarContainer = styled.div<{ isMobile: boolean; isOpen?: boolean }>`
	left: 0;
	top: 0;
	bottom: 0;
	background-color: white;
	padding: 16px;
	border-right: 1px solid #eee;
	transform: ${({ isMobile, isOpen }) => (isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)")};
	transition: transform 0.3s ease-in-out;

	@media (max-width: 600px) {
		position: fixed;
	}
	width: 20%;
`;

const ResetButton = styled.button`
	width: 87px;
	height: 40px;
	gap: 4px;
	border-radius: 8px;
	padding-top: 8px;
	padding-right: 24px;
	padding-bottom: 8px;
	padding-left: 24px;
	background: #fff5f2;

	font-family: amahafont;
	font-weight: 600;
	font-size: size/h5;
	line-height: line-height/h5;
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
	padding-top: 8px;
	padding-right: 24px;
	padding-bottom: 8px;
	background: #e76943;
	padding-left: 24px;
	font-family: amahafont;
	font-weight: 600;
	font-size: size/h5;
	line-height: line-height/h5;
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
	color: #333;
	font-family: amahafont;
	font-weight: 500;
	letter-spacing: 0%;
	vertical-align: middle;
	color: #4c4c4c;
`;

const ButtonsContainer = styled.div`
	display: flex;
	width: 312;
	height: 40;
	gap: 16px;
`;

interface SidebarFiltersProps {
	roster: RosterItem[];
}
export const SidebarFilters: FC<SidebarFiltersProps> = ({ roster }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [filter, setFilter] = useState({ provider_usertype: "0", is_inhouse: "0", clinic_details: "0" });
	const dispatch = useDispatch<AppDispatch>();
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
		// Dispatch the filter action here
		dispatch(filterProviders(filter));
	};

	const handleReset = () => {
		setFilter({ provider_usertype: "0", is_inhouse: "0", clinic_details: "0" });
		dispatch(filterProviders({ provider_usertype: "0", is_inhouse: "0", clinic_details: "0" }));
	};
	return (
		<SidebarContainer isMobile={isMobile}>
			<FlexBox>
				<SelectField
					type={"provider_usertype"}
					optionList={listOfTherapists}
					defaultValue={filter.provider_usertype}
					onSelectionChange={handleSelectionChange}
				/>
				<SelectField
					type={"is_inhouse"}
					optionList={listOfTypes}
					defaultValue={filter.is_inhouse}
					onSelectionChange={handleSelectionChange}
				/>
				<SelectField
					type={"clinic_details"}
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
	);
};

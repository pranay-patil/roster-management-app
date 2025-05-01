/* eslint-disable */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { filterProviderBasedOnIds, setFilteredOptions, setSelectedItems } from "@/redux/roster/rosterSlice";
const SearchIcon = styled.span`
	position: absolute;
	left: 12px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 18px;
	color: #888;
`;

const Container = styled.div`
	width: 350px;
	margin: 20px auto;
	font-family: sans-serif;
	max-width: 100%;
`;

const SelectedList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-bottom: 12px;
	margin-top: 8px;
	width: 100%; /* Ensure it matches SearchInput */
`;

const colors: any = {
	1: "#E3F2FF",
	2: "#FFEBEE",
	3: "#E3F5EB",
	4: "#FFE9E3",
	5: "#F5E3ED",
};

const Chip = styled.div<{ index: number }>`
	background-color: ${(props: { index: number }) => colors[props.index]};
	padding: 8px 12px;
	border-radius: 8px;
	font-size: 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%; /* Changed from fixed width */
	box-sizing: border-box;
`;

const RemoveButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	font-weight: bold;
	color: #555;
	font-size: 18px;
`;

const SearchInputWrapper = styled.div`
	position: relative;
	width: 100%;
`;

const SearchInput = styled.input`
	padding: 8px 12px 8px 36px;
	border: 1px solid #ccc;
	border-radius: 8px;
	font-size: 16px;
	width: 100%;
`;

const OptionsList = styled.ul`
	list-style: none;
	margin-top: 8px;
	padding: 0;
	border: 1px solid #ccc;
	border-radius: 8px;
	max-height: 150px;
	overflow-y: auto;
	position: absolute;
	z-index: 1000;
	background: #fff;
	width: 100%; /* Match SearchInput width */
	box-sizing: border-box;
`;

const OptionItem = styled.li`
	padding: 8px 12px;
	cursor: pointer;
	&:hover {
		background-color: #f0f0f0;
	}
`;

interface ListOfProvider {}
const SearchWithSelected: React.FC<ListOfProvider> = () => {
	const [inputValue, setInputValue] = useState("");
	const dispatch = useDispatch();
	const selectedItems = useSelector((state: RootState) => state.roster.selectedItems);
	const filteredOptions = useSelector((state: RootState) => state.roster.filteredOptions);
	const list = useSelector((state: RootState) => state.roster.originalRoster);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		const filtered = list.filter((option: any) => option.name.toLowerCase().includes(value.toLowerCase()));
		dispatch(setFilteredOptions(filtered));
	};

	const handleSelect = (id: string) => {
		const selectedOption = list.find((option: any) => option.id === id);
		if (!selectedOption) return;

		if (selectedItems.length >= 5) {
			alert("You can select a maximum of 5 items.");
			return;
		}

		if (!selectedItems.find((item) => item.id === id)) {
			const newSelectedItems = [...selectedItems, { id, name: selectedOption.name }];
			dispatch(setSelectedItems(newSelectedItems));
			dispatch(filterProviderBasedOnIds(newSelectedItems.map((item) => Number(item.id))));
		}

		setInputValue("");
		dispatch(setFilteredOptions(list));
	};

	const handleRemove = (id: string) => {
		const newSelectedItems = selectedItems.filter((item) => item.id !== id);
		dispatch(setSelectedItems(newSelectedItems));
		dispatch(filterProviderBasedOnIds(newSelectedItems.map((item) => Number(item.id))));
	};

	return (
		<Container>
			<SearchInputWrapper>
				<SearchIcon>
					<Search />
				</SearchIcon>
				<SearchInput
					type="text"
					placeholder="Search provider"
					value={inputValue}
					onChange={handleInputChange}
					disabled={selectedItems.length >= 5}
				/>
			</SearchInputWrapper>

			{inputValue && (
				<OptionsList>
					{filteredOptions.map((option: any) => (
						<OptionItem key={option.name} onClick={() => handleSelect(option.id)}>
							{option.name}
						</OptionItem>
					))}
				</OptionsList>
			)}

			<SelectedList>
				{selectedItems.map((item, index) => (
					<Chip key={item.id} index={index + 1}>
						{item.name}
						<RemoveButton onClick={() => handleRemove(item.id)}>×</RemoveButton>
					</Chip>
				))}
			</SelectedList>
		</Container>
	);
};

export default SearchWithSelected;

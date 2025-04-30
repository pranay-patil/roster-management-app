/* eslint-disable */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Search } from "lucide-react";

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
`;

const SelectedList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-bottom: 12px;
	margin-top: 8px;
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
	justify-content: space-between; /* <-- Spread text and button */
	align-items: center;
	width: 350px;
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
`;

const SearchInput = styled.input`
	width: 350px;
	padding: 8px 12px 8px 36px;
	border: 1px solid #ccc;
	border-radius: 8px;
	font-size: 16px;
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
	list-style: none;
	margin-top: 8px;
	padding: 0;
	border: 1px solid #ccc;
	border-radius: 8px;
	max-height: 150px;
	overflow-y: auto;
	z-index: 1000;
	width: 350px;
	background: #fff;
`;

const OptionItem = styled.li`
	padding: 8px 12px;
	cursor: pointer;
	&:hover {
		background-color: #f0f0f0;
	}
`;

interface ListOfProvider {
	[key: string]: any;
	onSelectionChange: (selectedItems: string[]) => void;
}
const SearchWithSelected: React.FC<ListOfProvider> = ({ listOfProvider, onSelectionChange }) => {
	const [inputValue, setInputValue] = useState("");
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [filteredOptions, setFilteredOptions] = useState<string[]>(listOfProvider);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		const filtered = listOfProvider.filter((option: any) =>
			option.name.toLowerCase().includes(value.toLowerCase()),
		);
		setFilteredOptions(filtered);
	};

	const handleSelect = (item: string) => {
		if (selectedItems.length >= 5) {
			alert("You can select a maximum of 5 items.");
			return;
		}
		if (!selectedItems.includes(item)) {
			setSelectedItems((prev) => [...prev, item]);
		}
		setInputValue("");
		setFilteredOptions(listOfProvider);
		onSelectionChange([...selectedItems, item]);
	};

	const handleRemove = (item: string) => {
		setSelectedItems((prev) => prev.filter((i) => i !== item));
		onSelectionChange([]);
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
						<OptionItem key={option.name} onClick={() => handleSelect(option.name)}>
							{option.name}
						</OptionItem>
					))}
				</OptionsList>
			)}

			<SelectedList>
				{selectedItems.map((item, index) => (
					<Chip key={item} index={index + 1}>
						{item}
						<RemoveButton onClick={() => handleRemove(item)}>×</RemoveButton>
					</Chip>
				))}
			</SelectedList>
		</Container>
	);
};

export default SearchWithSelected;

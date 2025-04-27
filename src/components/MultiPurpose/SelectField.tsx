/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from "react";
import { css } from "@emotion/react";

interface Option {
	id: string;
	name: string;
}

interface SelectFieldProps {
	defaultValue: string;
	onSelectionChange: (value: string, type: string) => void;
	optionList: Option[];
	type?: string;
}

export const SelectField: FC<SelectFieldProps> = ({ defaultValue, onSelectionChange, optionList = [], type }) => {
	const [value, setValue] = useState<string>(defaultValue);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = e.target.value;
		setValue(selected);
		onSelectionChange(selected, type as string);
	};

	return (
		<div css={containerStyle}>
			<select value={value} onChange={handleChange} css={selectStyle} aria-label="Select option">
				{optionList.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
};

// Styled components
const containerStyle = css`
	width: 100%;
	max-width: 400px;
	height: 40px;
`;

const selectStyle = css`
	width: 100%;
	height: 100%;
	border: 1px solid #c4c4c4;
	border-radius: 8px;
	padding: 0 12px;
	font-size: 16px;
	background-color: white;
	color: #333;
	outline: none;
	cursor: pointer;

	&:hover {
		border-color: #999;
	}

	&:focus {
		border-color: #1976d2;
		box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
	}
`;

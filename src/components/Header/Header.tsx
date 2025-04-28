/** @jsxImportSource @emotion/react */
import { Calendar } from "@/icons/Calendar";
import { DoubleLeftArrow } from "@/icons/DoubleLeftArrow";
import { MenuIcon } from "@/icons/Menu";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { DoubleRightArrow } from "@/icons/DoubleRightArrow";
const headerStyle = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 24px;
	border-bottom: 1px solid #ddd;
`;

const leftButtons = css`
	display: flex;
	gap: 12px;
	cursor: pointer;
`;

const rightButtons = css`
	display: flex;
	width: 80px;
	height: 40px;
	border: 1px solid #E0E0E0
	border-radius: 8px;
`;

const ProviderCalendar = styled.div`
	font-family: amahafont;
	font-weight: 600;
	font-size: 18px;
	line-height: line-height/h1;
	letter-spacing: 0%;
`;

const MenuIconButton = styled.button<{ isHeighLight: boolean; side: string }>`
	gap: 8px;
	padding: 8px;
	cursor: pointer;
	border-radius: ${({ side }) => (side === "left" ? "8px 0px 0px 8px" : "0px 8px 8px 0px")};
	cursor: pointer;
	background: ${({ isHeighLight }) => (isHeighLight ? "#dbe7cc" : "transparent")};
	:hover {
		background-color: #f7f7f7;
	}
`;

interface HeaderProps {
	view: string;
	toggleView: (view: string) => void;
	isHidden: boolean;
	handleSideBarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, toggleView, isHidden, handleSideBarToggle }) => {
	return (
		<header css={headerStyle}>
			<div css={leftButtons} onClick={handleSideBarToggle}>
				{!isHidden ? <DoubleLeftArrow /> : <DoubleRightArrow />}
				<ProviderCalendar>Provider Calendar</ProviderCalendar>
			</div>
			<div css={rightButtons}>
				<MenuIconButton isHeighLight={view === "slot"} side="left" onClick={() => toggleView("slot")}>
					<MenuIcon />
				</MenuIconButton>
				<MenuIconButton isHeighLight={view === "calendar"} side="right" onClick={() => toggleView("calendar")}>
					<Calendar />
				</MenuIconButton>
			</div>
		</header>
	);
};

export default Header;

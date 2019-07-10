// ARIA for Tabs are documented in https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// Tabs from Reach-Ui were used as a base https://ui.reach.tech/tabs

import styled, { css } from 'styled-components';
import 'focus-visible';
import { resetStyles } from '../utils';
import { colors, thickness } from '../shared-styles';
import { mediaSizes } from '../shared-styles';

const borderRadius = '3px 3px 0 0';

const selectedTab = css`
	font-weight: 600;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background-color: ${({ theme }) => theme.tabHighlightColor || colors.blueBase};

		border-right: 1px solid ${({ theme }) => theme.tabHighlightColor || colors.blueBase};
		border-left: 1px solid ${({ theme }) => theme.tabHighlightColor || colors.blueBase};
		border-radius: ${borderRadius};
	}

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 1px;
		width: calc(100% - 2px);
		height: 1px;
		background-color: ${({ theme }) => theme.activeBackgroundColor || 'white'};
	}

	background-color: ${({ theme }) => theme.activeBackgroundColor || 'white'};
	border-right: 1px solid ${colors.gray14};
	border-left: 1px solid ${colors.gray14};
`;

export const Tab = styled.button.attrs({
	role: 'tab',
	'aria-selected': ({ selected }) => selected,
	'aria-controls': ({ panelId }) => `panel:${panelId}`,
	'aria-disabled': ({ disabled }) => disabled,
	tabIndex: ({ selected }) => (selected ? 0 : -1),
})`
	${resetStyles};

	box-shadow: none;
	outline: none;
	background: white;
	border: none;
	display: inline-block;
	padding: 0;
	transition: all 0.25s ease 0s;
	border: 0;
	border-radius: ${borderRadius};

	position: relative;

	&:focus:not(.focus-visible) {
		outline: none;
	}

	&.focus-visible {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
			z-index: 10;
		}
	}

	&::-moz-focus-inner {
		border: 0;
	}
`;

export const TabContent = styled.span.attrs({ tabIndex: -1 })`
	border-radius: ${borderRadius};
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	white-space: nowrap;
	min-height: fit-content;
	display: inline-block;
	font-size: ${({ styleOverrides }) => styleOverrides.fontSize || thickness.sixteen};
	width: ${({ styleOverrides }) => styleOverrides.width};
	padding: ${({ styleOverrides }) =>
		styleOverrides.padding || `${thickness.eight} ${thickness.sixteen}`};
	background-color: ${({ theme }) => theme.inactiveBackgroundColor || colors.gray4};

	&:focus {
		outline: none;
	}

	${({ disabled }) => (disabled ? `color: ${colors.gray52}` : '')};
	${({ selected }) => selected && selectedTab};
`;

export const TabList = styled.div.attrs({ role: 'tablist' })`
	border-bottom: 1px solid ${colors.gray14};
	display: flex;
	flex-direction: row;

	& > *:not(:last-child) {
		margin-right: ${thickness.eight};
	}
`;

export const TabPanel = styled.div.attrs({
	role: 'tabpanel',
	id: ({ panelId }) => `panel:${panelId}`,
	'aria-expanded': ({ selected }) => selected,
})`
	position: relative;
	padding: ${thickness.eight};

	&:focus {
		outline: none;
	}

	${({ selected }) => !selected && 'display: none'};
`;

export const SequencedTabList = styled.div.attrs(() => ({ role: 'tablist' }))`
	display: flex;
	flex-direction: row;
`;

export const SequencedTab = styled(Tab)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	flex-basis: 0;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	background: ${({ selected }) => (selected ? colors.blueTint : 'white')};
	height: 54px;
	border-radius: 0;

	@media (hover: hover) {
		&:hover {
			background: #d5ecfc;
		}
	}
`;

export const SequencedTabContent = styled.span.attrs(() => ({ tabIndex: -1 }))`
	overflow: wrap;
	min-height: fit-content;
	display: none;
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase;
	color: ${({ selected, disabled }) =>
		selected ? colors.blueBase : disabled ? colors.gray22 : colors.gray52};
	padding-right: 16px;

	@media (min-width: ${mediaSizes.phone}) {
		display: flex;
	}

	&:focus {
		outline: none;
	}
`;

export const Circle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: solid 2px
		${({ selected, completed, disabled }) =>
			selected || completed ? colors.blueLight : disabled ? colors.gray14 : colors.gray34};
	border-radius: 50px;
	width: 24px;
	min-width: 24px;
	height: 24px;
	margin: 0px;
	font-size: 14px;
	font-weight: bold;
	color: ${({ selected, disabled }) =>
		selected ? colors.blueBase : disabled ? colors.gray22 : colors.gray52};
	background: ${({ completed }) => completed && colors.blueLight};

	@media (min-width: ${mediaSizes.phone}) {
		margin: 0px 8px 0px 14px;
	}
`;

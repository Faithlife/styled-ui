// ARIA for Tabs are documented in https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// Tabs from Reach-Ui were used as a base https://ui.reach.tech/tabs

import styled, { css } from 'styled-components';
import 'focus-visible';
import { Box } from '../Box';
import { UtilityButton } from '../button';
import { Text } from '../Text';
import { resetStyles } from '../utils';
import { thickness } from '../shared-styles';
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
		background-color: ${({ theme }) => theme.colors.blue4};

		border-right: 1px solid ${({ theme }) => theme.colors.blue4};
		border-left: 1px solid ${({ theme }) => theme.colors.blue4};
		border-radius: ${borderRadius};
	}

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 1px;
		width: calc(100% - 2px);
		height: 1px;
		background-color: ${({ theme }) => theme.colors.white};
	}

	background-color: ${({ theme }) => theme.colors.white};
	border-right: 1px solid ${({ theme }) => theme.colors.gray14};
	border-left: 1px solid ${({ theme }) => theme.colors.gray14};
`;

export const Tab = styled(UtilityButton).attrs(({ selected, panelId, disabled }) => ({
	role: 'tab',
	'aria-selected': selected,
	'aria-controls': `panel:${panelId}`,
	'aria-disabled': disabled,
	tabIndex: selected ? 0 : -1,
}))`
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

export const TabContent = styled(Text).attrs(() => ({ tabIndex: -1 }))`
	border-radius: ${borderRadius};
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	white-space: nowrap;
	min-height: fit-content;
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.gray4};

	&:focus {
		outline: none;
	}

	${({ disabled, theme }) => (disabled ? `color: ${theme.colors.gray52}` : '')};
	${({ selected }) => selected && selectedTab};
`;

export const TabList = styled(Box).attrs(() => ({ role: 'tablist' }))`
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray14};
	display: flex;
	flex-direction: row;

	& > *:not(:last-child) {
		margin-right: ${thickness.eight};
	}
`;

export const TabPanel = styled(Box).attrs(() => ({
	role: 'tabpanel',
	id: ({ panelId }) => `panel:${panelId}`,
	'aria-expanded': ({ selected }) => selected,
}))`
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
	background: ${({ selected, theme }) => (selected ? theme.colors.blue1 : theme.colors.white)};
	height: 54px;
	border-radius: 0;

	@media (hover: hover) {
		&:hover {
			background: #d5ecfc;
		}
	}
`;

export const SequencedTabContent = styled(Text).attrs(() => ({ tabIndex: -1 }))`
	overflow: wrap;
	min-height: fit-content;
	display: none;
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase;
	color: ${({ selected, disabled, theme }) =>
		selected ? theme.colors.blue4 : disabled ? theme.colors.gray22 : theme.colors.gray52};
	padding-right: 16px;

	@media (min-width: ${mediaSizes.phone}) {
		display: flex;
	}

	&:focus {
		outline: none;
	}
`;

export const Circle = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	border: solid 2px
		${({ selected, completed, disabled, theme }) =>
			selected || completed
				? theme.colors.blue3
				: disabled
				? theme.colors.gray14
				: theme.colors.gray34};
	border-radius: 50%;
	width: 24px;
	min-width: 24px;
	height: 24px;
	margin: 0px;
	font-size: 14px;
	font-weight: bold;
	color: ${({ selected, disabled, theme }) =>
		selected ? theme.colors.blue4 : disabled ? theme.colors.gray22 : theme.colors.gray52};
	background: ${({ completed, theme }) => completed && theme.colors.blue3};

	@media (min-width: ${mediaSizes.phone}) {
		margin: 0px 8px 0px 14px;
	}
`;

// ARIA for Tabs are documented in https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// Tabs from Reach-Ui were used as a base https://ui.reach.tech/tabs

import styled, { css } from 'styled-components';
import { resetStyles } from '../utils';
import { colors, thickness } from '../shared-styles';

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

export const Tab = styled.button.attrs(props => ({
	role: 'tab',
	'aria-selected': props.selected,
	'aria-controls': `panel:${props.panelId}`,
	'aria-disabled': props.disabled,
	tabIndex: props.selected ? '0' : '-1',
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

	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		outline: none;
	}
`;

export const TabContent = styled.span.attrs(_ => ({ tabIndex: -1 }))`
	border-radius: ${borderRadius};
	cursor: pointer;
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

export const TabList = styled.div.attrs(_ => ({ role: 'tablist' }))`
	border-bottom: 1px solid ${colors.gray14};
	display: flex;
	flex-direction: row;

	& > *:not(:last-child) {
		margin-right: ${thickness.eight};
	}
`;

export const TabPanel = styled.div.attrs(props => ({
	role: 'tabpanel',
	id: `panel:${props.panelId}`,
	'aria-expanded': props.selected,
}))`
	position: relative;
	padding: ${thickness.eight};

	&:focus {
		outline: none;
	}

	${({ selected }) => !selected && 'display: none'};
`;

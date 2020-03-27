// ARIA for Tabs are documented in https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// Tabs from Reach-Ui were used as a base https://ui.reach.tech/tabs

import styled from 'styled-components';
import { variant, layout, position, textStyle, border, background } from 'styled-system';
import 'focus-visible';
import { Box } from '../Box';
import { UtilityButton } from '../button';
import { Text } from '../Text';
import { resetStyles } from '../utils';
import { mediaSizes } from '../shared-styles';

import 'focus-visible';
import { common, typography } from '../../theme/system';
import { tabs, tabLists, selected } from '../../theme/tabs';

const borderRadius = '3px 3px 0 0';

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

// New variant tabs

const tabVariant = variant({
	prop: 'variant',
	scale: 'tab',
	variants: tabs,
});

const selectedTabVariant = variant({
	prop: 'selectedVariant',
	scale: 'tab',
	variants: selected,
});

const tabListVariant = variant({
	prop: 'variant',
	scale: 'tab',
	variants: tabLists,
});

export const TabCore = styled(UtilityButton).attrs(({ variant, selected, panelId }) => ({
	selectedVariant: `${variant}-${selected}`,

	role: 'tab',
	'aria-controls': `panel:${panelId}`,
	'aria-selected': selected,
	tabIndex: selected ? 1 : -1,
}))`
	position: relative;

	display: block;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;

	${tabVariant}
	${selectedTabVariant}
	${textStyle};

	${common};
	${typography};
	${layout};
	${position};
	${border};
	${background};
`;

export const TabListCore = styled(Box).attrs({
	role: 'tablist',
})`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;

	${tabListVariant}
	${textStyle};

	${common};
	${layout};
	${position};
	${border};
	${background};
`;

export const TabPanelsCore = styled(Box)``;

export const TabPanelCore = styled(Box).attrs({
	role: 'tabpanel',
})`
	display: ${({ selected }) => (selected ? 'block' : 'none')};
`;

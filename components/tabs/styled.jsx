// ARIA for Tabs are documented in https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// Tabs from Reach-Ui were used as a base https://ui.reach.tech/tabs

import styled, { css } from 'styled-components';
import { system } from 'styled-system';
import { resetStyles } from '../utils';
import { Text } from '../Text';
const borderRadius = '3px 3px 0 0';

export const Tab = styled.button.attrs({
	role: 'tab',
	'aria-selected': ({ selected }) => selected,
	'aria-controls': ({ panelId }) => `panel:${panelId}`,
	'aria-disabled': ({ disabled }) => disabled,
	tabIndex: ({ selected }) => (selected ? '0' : '-1'),
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

	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		outline: none;
	}
`;

export const TabContent = styled(Text)`
	&:focus {
		${system({ focusOutline: { property: 'outline' } })};
	}

	&::before {
		${system({ beforeBorderColor: { property: 'border-color', scale: 'colors' } })};
		${system({ beforeBackgroundColor: { property: 'background-color', scale: 'colors' } })};
	}

	&::after {
		${system({ afterBackgroundColor: { property: 'background-color', scale: 'colors' } })};
	}

	${({ selected }) => selected && selectedTab};
`;

const selectedTab = css`
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;

		border-right: 1px solid;
		border-left: 1px solid;
		border-radius: 3px 3px 0 0;
	}

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 1px;
		width: calc(100% - 2px);
		height: 1px;
	}
`;

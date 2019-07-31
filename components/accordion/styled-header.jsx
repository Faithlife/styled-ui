import styled from 'styled-components';
import { resetStyles } from '../utils';

export const Heading = styled.header.attrs({
	role: 'heading',
	'aria-level': ({ ariaLevel }) => ariaLevel,
})`
	${resetStyles};

	grid-column: 1 / span 2;
	grid-row: 1;
	min-width: 0;
	width: 100%;
`;

export const Button = styled.button.attrs({
	role: 'button',
	'aria-expanded': ({ isExpanded }) => isExpanded,
	'aria-controls': ({ panelId }) => `accordion-panel-${panelId}`,
	id: ({ headerId }) => `accordion-header-${headerId}`,
})`
	${resetStyles};

	padding: 0;
	border: 0;
	background: 0;
	appearance: none;
	width: 100%;
	height: 100%;
	text-align: left;
`;

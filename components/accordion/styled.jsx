import styled, { css } from 'styled-components';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const AccordionItem = styled.div`
	display: grid;
	grid-template-columns: [title] auto [extra] min-content;
	grid-template-areas:
		'header header'
		'panel panel';
`;

export const AccordionHeader = styled.div.attrs({ tabIndex: '0' })`
	grid-area: header;
	background: ${colors.gray22};
`;

export const AccordionPanel = styled.div`
	grid-area: panel;
`;

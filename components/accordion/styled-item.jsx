import styled from 'styled-components';
import { resetStyles } from '../utils';

export const AccordionItem = styled.div`
	${resetStyles};

	display: grid;
	grid-template-columns: ${({ customIndicator }) =>
		customIndicator ? '[title] auto [indicator] min-content' : '[title] auto [space] 0'};
	grid-template-areas:
		'header header'
		'panel panel';
`;

import styled from 'styled-components';
import { resetStyles } from '../utils';

export const AccordionItem = styled.div`
	${resetStyles};

	display: grid;
	grid-template-columns: [title] auto [extra] min-content;
	grid-template-areas:
		'header header'
		'panel panel';
`;

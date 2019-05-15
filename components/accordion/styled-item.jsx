import styled from 'styled-components';
import { resetStyles } from '../utils';

export const AccordionItem = styled.section`
	${resetStyles};

	display: grid;
	grid-template-areas:
		'header header'
		'panel panel';
`;

import styled from 'styled-components';
import { resetStyles } from '../utils';

export const Item = styled.section`
	${resetStyles};

	display: grid;
	grid-template-areas:
		'header'
		'panel';
`;

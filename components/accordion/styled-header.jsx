import styled from 'styled-components';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const AccordionHeader = styled.div.attrs({ tabIndex: '0' })`
	${resetStyles};

	grid-area: header;
	background: ${colors.gray22};
`;

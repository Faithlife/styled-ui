import styled from 'styled-components';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const AccordionHeader = styled.div.attrs({ tabIndex: '0' })`
	${resetStyles};

	grid-area: header;

	display: grid;
	padding: 16px 24px;
	grid-template-columns: ${props => (props.hideArrows ? 'auto' : 'min-content auto')};
	grid-column-gap: 12px;

	line-height: 1;
	border-top: 1px solid ${colors.gray14};
	background: linear-gradient(180deg, #fafafa, hsla(0, 0%, 100%, 0));

	color: ${colors.gray52};
	text-transform: uppercase;
	letter-spacing: 0.5px;
	font-weight: 600;
	font-family: 'Source Sans Pro';
`;

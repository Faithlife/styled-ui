import styled from 'styled-components';
import { thickness } from '../shared-styles';

export const HelpCardBox = styled.div`
	position: relative;
	display: flex;
	border-radius: 3px;
	background-color: ${props => props.theme.backgroundColor};
	border: solid 1px ${props => props.theme.borderColor};
	border-left: solid ${thickness.four} ${props => props.theme.borderColor};
	word-break: break-word;
`;

export const HelpCardContent = styled.div`
	padding: ${thickness.six};
	text-align: left;
	color: ${props => props.theme.backgroundColor};
`;

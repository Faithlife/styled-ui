import styled from 'styled-components';
import { fonts, colors, thickness } from '../shared-styles';

export const DropZone = styled.div`
	${fonts.ui16};
	transition: background 1s ease;
	border: 2px dashed ${colors.borderColor};
	padding: ${thickness.twelve};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	line-height: 26px;
	background: ${props => (props.showHighlight ? colors.blueTint : null)};
`;

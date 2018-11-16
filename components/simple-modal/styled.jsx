import styled from 'styled-components';
import { resetStyles } from '../utils';

export const SimpleModal = styled.div`
	${resetStyles};
	margin: auto;
	width: fit-content;
	height: fit-content;
	max-height: 80%;
	background-color: ${props => props.theme.background};
	border-radius: 3px;

	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ModalClose = styled.div`
	position: absolute;
	top: 24px;
	right: 24px;
	cursor: pointer;
	z-index: 200;
`;

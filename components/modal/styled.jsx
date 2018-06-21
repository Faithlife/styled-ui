import styled from 'styled-components';
import { thickness, fonts, colors } from '../shared-styles';

export const Label = styled.label`
	display: block;
	margin-bottom: ${thickness.four};
	width: 100%;
`;

export const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
`;

export const Modal = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: fit-content;
	height: fit-content;
	padding: ${thickness.twentyfour};
	background-color: ${props => props.theme.background};
	border-radius: 3px;
	min-width: 280px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ModalHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding-bottom: ${thickness.twelve};
	margin-bottom: ${thickness.twelve};
	border-bottom: 1px solid ${colors.borderColor};
`;

export const ModalTitleBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-bottom: ${thickness.twelve};
`;

export const ModalTitle = styled.div`
	${fonts.h4};
`;

export const ModalClose = styled.div`
	cursor: pointer;
`;

export const ModalSubtitle = styled.div`
	width: 100%;
	${fonts.ui14};
`;

export const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: ${thickness.twentyfour};
	width: 100%;
`;

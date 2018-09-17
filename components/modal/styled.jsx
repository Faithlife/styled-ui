import styled from 'styled-components';
import { thickness, fonts, colors } from '../shared-styles';

export const Label = styled.label`
	display: block;
	margin-bottom: ${thickness.four};
	width: 100%;
`;

export const Modal = styled.div`
	margin: auto;
	width: fit-content;
	height: fit-content;
	max-height: 80%;
	padding: ${thickness.twentyfour};
	background-color: ${props => props.theme.background};
	border-radius: 3px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ModalContent = styled.div`
	max-height: 80%;
	overflow-x: hidden;
	overflow-y: auto;
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

export const FooterContainer = styled.div`
	display: flex;
	flex-direction: ${props => (props.theme.verticalButtons ? 'column' : 'row')};
	justify-content: flex-end;
	align-items: center;
	width: 100%;
`;

export const CancelContainer = styled.div`
	${props =>
		props.theme.verticalButtons ? 'margin-bottom' : 'margin-right'}: ${thickness.sixteen};
	${props => (props.theme.verticalButtons ? 'width: 100%' : null)};
`;

export const DeleteContainer = styled.div`
	${props =>
		props.theme.verticalButtons ? `margin-bottom: ${thickness.sixteen}` : 'margin-right: auto'};
	${props => (props.theme.verticalButtons ? 'width: 100%' : null)};
`;

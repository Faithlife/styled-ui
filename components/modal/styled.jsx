import styled from 'styled-components';
import { thickness, fonts, colors, mediaSizes } from '../shared-styles';
import { resetStyles } from '../utils';

export const Label = styled.label`
	display: block;
	margin-bottom: ${thickness.four};
	width: 100%;
`;

export const Modal = styled.div`
	${resetStyles};
	margin: auto;
	width: fit-content;
	height: fit-content;
	max-width: calc(100% - ${thickness.sixteen});
	max-height: 80%;
	padding: ${thickness.twentyfour};
	background-color: ${props => props.theme.background};
	border-radius: 3px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (max-width: ${mediaSizes.tablet}) {
		max-height: calc(100% - ${thickness.sixteen});
	}
`;

export const ModalContent = styled.div`
	max-width: 100%;
	max-height: 80%;
	overflow-x: hidden;
	overflow-y: auto;
	overflow-wrap: break-word;
`;

export const ModalHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding-bottom: ${thickness.twelve};
	margin-bottom: ${thickness.twelve};
	${props =>
		props.styleOverrides.bottomBorder
			? props.styleOverrides.bottomBorder
			: `border-bottom: 1px solid ${colors.borderColor}`};
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
	color: ${colors.gray66};
`;

export const ModalSubtitle = styled.div`
	width: 100%;
	${fonts.ui14};
	color: ${colors.gray66};
`;

export const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: ${thickness.twentyfour};
	width: 100%;
`;

export const FooterContainer = styled.div`
	display: flex;
	flex-direction: ${props => (props.theme.verticalButtons ? 'column-reverse' : 'row-reverse')};
	justify-content: flex-start;
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

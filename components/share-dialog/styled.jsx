import styled from 'styled-components';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const ShareAnchor = styled.a`
	${resetStyles};
	display: flex;

	@media (hover: none) {
		padding: 10px;
	}
	@media (hover: hover) {
		padding: 4px;
	}
`;

export const ShareContainer = styled.div`
	display: grid;
	grid-gap: 8px;
	align-items: center;

	@media (hover: none) {
		grid-auto-flow: row;
	}

	@media (hover: hover) {
		grid-auto-flow: column;
	}
`;

export const ButtonContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	justify-content: flex-start;
`;

export const CopyContainer = styled.div`
	position: relative;
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 1fr min-content;
	grid-gap: 8px;
`;

export const Copied = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	color: ${colors.gray34};
`;

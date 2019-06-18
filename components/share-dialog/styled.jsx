import styled from 'styled-components';
import { thickness, colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const ShareAnchor = styled.a`
	${resetStyles};

	@media (hover: none) {
		padding: 10px;
	}
	@media (hover: hover) {
		margin: 0 ${thickness.four};
	}
	display: flex;
`;

export const ShareContainer = styled.div`
	display: flex;
	align-items: center;
	margin: ${thickness.four} 0;
`;

export const CopyContainer = styled.div`
	margin: 0 ${thickness.eight};
`;

export const Copied = styled.div`
	position: absolute;
	color: ${colors.gray34};
`;

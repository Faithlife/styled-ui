import * as _Bootstrap from 'reactstrap';
import styled from 'styled-components';
import { thickness, colors } from '../shared-styles';
import { resetStyles, wrapBootstrap } from '../utils';

export const Input = wrapBootstrap(_Bootstrap.Input);

export const ShareAnchor = styled.a`
	${resetStyles};

	margin: 0 ${thickness.four};
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

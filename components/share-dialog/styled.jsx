import * as _Bootstrap from 'reactstrap';
import styled from 'styled-components';
import { thickness, fonts, colors } from '../shared-styles';
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
`;

export const CopyContainer = styled.div`
	margin: 0 ${thickness.eight};
`;

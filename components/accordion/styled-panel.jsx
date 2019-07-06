import styled from 'styled-components';
import { resetStyles } from '../utils';

export const Panel = styled.div.attrs(props => ({
	role: 'region',
	'aria-labelledby': `accordion-header-${props.headerId}`,
	id: `accordion-panel-${props.panelId}`,
}))`
	${resetStyles};

	grid-area: panel;

	padding: ${({ styleOverrides }) => styleOverrides.panelPadding || '12px 24px 24px'};
`;

export const PanelContainer = styled.div`
	min-width: 0;
`;

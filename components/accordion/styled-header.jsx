import styled from 'styled-components';
import { colors, mediaSizes } from '../shared-styles';
import { resetStyles } from '../utils';

export const HeadingWrapper = styled.div`
	${resetStyles};

	display: grid;
	grid-area: header;
	grid-template-columns: ${({ renderCustomIndicator }) =>
		renderCustomIndicator ? '[title] 1fr [indicator] min-content' : '[title] auto [space] 0'};
`;

export const Heading = styled.header.attrs(props => ({
	role: 'heading',
	'aria-level': props.ariaLevel,
}))`
	${resetStyles};

	grid-column: 1 / span 2;
	grid-row: 1;
	min-width: 0;
	width: 100%;
`;

export const Button = styled.button.attrs(props => ({
	role: 'button',
	'aria-expanded': props.isExpanded,
	'aria-controls': `accordion-panel-${props.panelId}`,
	id: `accordion-header-${props.headerId}`,
}))`
	${resetStyles};

	padding: 0;
	border: 0;
	background: 0;
	appearance: none;
	width: 100%;
	height: 100%;
	text-align: left;
`;

export const ButtonContentWrapper = styled.div`
	${resetStyles};

	display: grid;
	align-items: center;
	grid-template-columns: ${props => (props.hideArrows ? 'auto' : 'min-content auto')};
	grid-column-gap: 12px;

	line-height: 1;
	border-top: 1px solid ${colors.gray14};
	background: linear-gradient(180deg, #fafafa, hsla(0, 0%, 100%, 0));

	padding: 16px;
	@media (min-width: ${mediaSizes.tablet}) {
		padding: 16px 24px;
	}
`;

export const ButtonContent = styled.div`
	${resetStyles};

	display: inline-grid;
	grid-template-columns: min-content auto;
	grid-gap: 24px;
	align-items: center;
	white-space: nowrap;
`;

export const Title = styled.div`
	display: grid;
	color: ${colors.gray52};
	text-transform: uppercase;
	letter-spacing: 0.5px;
	font-weight: 600;
	font-family: 'Source Sans Pro';
	font-size: 16px;
`;

export const Subtitle = styled.div`
	display: grid;
	color: ${colors.gray52};
	font-family: 'Source Sans Pro';
	font-size: 14px;
	line-height: 16px;
`;

export const Indicator = styled.div`
	${resetStyles};

	grid-column: indicator;
	grid-row: 1;

	margin-top: 16px;
	margin-right: 16px;

	@media (min-width: ${mediaSizes.tablet}) {
		margin-right: 24px;
	}
`;

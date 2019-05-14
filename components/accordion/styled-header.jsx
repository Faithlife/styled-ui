import styled from 'styled-components';
import { colors, mediaSizes } from '../shared-styles';
import { resetStyles } from '../utils';

export const HeadingWrapper = styled.div`
	${resetStyles};

	display: grid;
	grid-area: header;
	grid-template-columns: ${({ customIndicator }) =>
		customIndicator ? '[title] auto [indicator] min-content' : '[title] auto [space] 0'};
`;

export const Heading = styled.div.attrs({
	role: 'heading',
})`
	${resetStyles};

	grid-column: 1 / span 2;
	grid-row: 1;
`;

export const Button = styled.button.attrs({
	role: 'button',
	'aria-disabled': ({ isExpanded }) => !isExpanded,
	'aria-expanded': ({ isExpanded }) => isExpanded,
})`
	${resetStyles};

	padding: 0;
	border: 0;
	background: 0;
	appearance: none;
	width: 100%;
	height: 100%;
	text-align: left;
`;

export const ButtonContent = styled.div`
	${resetStyles};

	display: grid;
	grid-template-columns: ${props => (props.hideArrows ? 'auto' : 'min-content auto')};
	grid-column-gap: 12px;

	line-height: 1;
	border-top: 1px solid ${colors.gray14};
	background: linear-gradient(180deg, #fafafa, hsla(0, 0%, 100%, 0));

	color: ${colors.gray52};
	text-transform: uppercase;
	letter-spacing: 0.5px;
	font-weight: 600;
	font-family: 'Source Sans Pro';
	font-size: 16px;

	padding: 16px;
	@media (min-width: ${mediaSizes.tablet}) {
		padding: 16px 24px;
	}
`;

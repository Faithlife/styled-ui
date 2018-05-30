import styled from 'styled-components';
import { thickness, colors } from '../shared-styles';

export const Button = styled.button`
	box-shadow: none;
	border-radius: 3px;
	margin: 0;
	cursor: pointer;
	font-size: 14px;
	transition: all 0.25s ease 0s;
	white-space: nowrap;

	&:focus {
		outline: none;
	}
`;

export const variationMap = {
	primary: component => component.extend`
		border: 1px solid ${props => props.theme.default};
		background-color: ${props => props.theme.default};
		color: #fff;

		&:hover {
			border-color: ${props => props.theme.hover};
			background-color: ${props => props.theme.hover};
			color: #fff;
		}

		&:active {
			border-color: ${props => props.theme.active};
			background-color: ${props => props.theme.active};
			color: #fff;
		}

		&:disabled {
			border-color: ${props => props.theme.disabled};
			background-color: ${props => props.theme.disabled};
			cursor: default;
		}
`,
	primaryOutline: component => component.extend`
		border: 1px solid ${props => props.theme.default};
		background: none;
		color: ${props => props.theme.default};

		&:hover {
			background-color: ${props => props.theme.hover};
			border-color: ${props => props.theme.hover};
			color: #fff;
		}

		&:active {
			background-color: ${props => props.theme.active};
			border-color: ${props => props.theme.active};
			color: #fff;
		}

		&:disabled {
			background: none;
			border-color: ${props => props.theme.disabled};
			color: ${props => props.theme.disabled};
			cursor: default;
		}
`,
	minor: component => component.extend`
		border: 1px solid ${colors.gray14};
		background: ${colors.gray4};
		color: ${colors.flGray};

		&:hover {
			background-color: ${colors.gray14};
			border: 1px solid ${colors.gray14};
			color: ${colors.flGray};
		}

		&:active {
			background-color: ${colors.gray22};
			border: 1px solid ${colors.gray22};
			color: ${colors.flGray};
		}

		&:disabled {
			background-color: #fff;
			border-color: ${colors.gray8};
			color: ${colors.gray22};
			cursor: default;
		}
`,
	small: component => component.extend`
		padding: 6px ${thickness.eight};
`,
	medium: component => component.extend`
		padding: ${thickness.eight} 10px;
`,
	large: component => component.extend`
		padding: ${thickness.twelve} ${thickness.sixteen};
		font-size: 16px;
`,
	extraLarge: component => component.extend`
		padding: ${thickness.sixteen} ${thickness.twentyfour};
		font-size: 24px;
`,
};

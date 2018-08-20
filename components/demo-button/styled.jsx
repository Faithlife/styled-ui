import styled from 'styled-components';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

const buttonColors = {
	default: '#278ed4',
	hover: '#6db3e2',
	active: '#1d6ca1',
	disabled: '#bedcf2',
};
export const Button = styled.button`
	${resetStyles};

	box-shadow: none;
	border-radius: 3px;
	cursor: pointer;
	transition: all 0.25s ease 0s;
	white-space: nowrap;
	font-size: ${props => props.theme.fontSize || '14px'};
	width: ${props => props.theme.width};
	padding: ${props => props.theme.padding};

	&:focus {
		outline: none;
	}
`;

export const variationMap = {
	primary: component => component.extend`
		border: 1px solid ${props => props.theme.defaultColor || buttonColors.default};
		background-color: ${props => props.theme.defaultColor || buttonColors.default};
		color: #fff;

		&:hover {
			border-color: ${props => props.theme.hoverColor || buttonColors.hover};
			background-color: ${props => props.theme.hoverColor || buttonColors.hover};
			color: #fff;
		}

		&:active {
			border-color: ${props => props.theme.activeColor || buttonColors.active};
			background-color: ${props => props.theme.activeColor || buttonColors.active};
			color: #fff;
		}

		&:disabled {
			border-color: ${props => props.theme.disabledColor || buttonColors.disabled};
			background-color: ${props => props.theme.disabledColor || buttonColors.disabled};
			cursor: default;
		}
`,
	primaryOutline: component => component.extend`
		border: 1px solid ${props => props.theme.defaultColor || buttonColors.default};
		background: none;
		color: ${props => props.theme.defaultColor || buttonColors.default};

		&:hover {
			background-color: ${props => props.theme.hoverColor || buttonColors.hover};
			border-color: ${props => props.theme.hoverColor || buttonColors.hover};
			color: #fff;
		}

		&:active {
			background-color: ${props => props.theme.activeColor || buttonColors.active};
			border-color: ${props => props.theme.activeColor || buttonColors.active};
			color: #fff;
		}

		&:disabled {
			background: none;
			border-color: ${props => props.theme.disabledColor || buttonColors.disabled};
			color: ${props => props.theme.disabledColor || buttonColors.disabled};
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
	link: component => component.extend`
		border: none;
		background: none;
		color: ${props => props.theme.defaultColor || buttonColors.default};
		padding: 0;

		&:hover {
			color: ${props => props.theme.hoverColor || buttonColors.hover};
		}

		&:active {
			color: ${props => props.theme.activeColor || buttonColors.active};
		}

		&:disabled {
			color: ${props => props.theme.disabledColor || buttonColors.disabled};
			cursor: default;
		}
`,
	small: component => component.extend`
		padding: 6px 12px;
`,
	medium: component => component.extend`
		padding: 8px 16px;
`,
	large: component => component.extend`
		padding: 12px 24px;
		font-size: 16px;
`,
	extraLarge: component => component.extend`
		padding: 16px 32px;
		font-size: 24px;
`,
};

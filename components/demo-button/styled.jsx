import styled from 'styled-components';
import { thickness } from '../shared-styles';

export const Button = styled.button`
	box-shadow: none;
	border-radius: 2px;
	margin: 0;
	cursor: pointer;

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
			border-color: ${props => props.theme.hover};
			background-color: none;
			color: ${props => props.theme.default};
		}

		&:active {
			border-color: ${props => props.theme.active};
			background-color: none;
			color: ${props => props.theme.default};
		}

		&:disabled {
			border-color: ${props => props.theme.disabled};
			background-color: none;
			cursor: default;
		}
`,
	small: component => component.extend`
		padding: ${thickness.two} ${thickness.three};
`,
	medium: component => component.extend`
		padding: ${thickness.three} ${thickness.four};
`,
	large: component => component.extend`
		padding: ${thickness.four} ${thickness.five};
`,
	extraLarge: component => component.extend`
		padding: ${thickness.five} ${thickness.six};
`,
};

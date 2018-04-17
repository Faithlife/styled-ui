import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { thickness } from '../shared-styles';
import { applyVariations } from '../utils';

const theme = {
	default: '#278ed4',
	hover: '#6db3e2',
	active: '#1d6ca1',
	disabled: '#bedcf2',
};

const Button = styled.button`
	box-shadow: none;
	border-radius: 2px;
	margin: 0;
	cursor: pointer;

	&:focus {
		outline: none;
	}
`;

const variationMap = {
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
		background-color: background: none;
		color: ${props => props.theme.default};
	}

	&:active {
		border-color: ${props => props.theme.active};
		background-color: background: none;
		color: ${props => props.theme.default};
	}

	&:disabled {
		border-color: ${props => props.theme.disabled};
		background-color: background: none;
		cursor: default;
	}
`,
	small: component => component.extend`padding: ${thickness.two} ${thickness.three}`,
	medium: component => component.extend`padding: ${thickness.three} ${thickness.four}`,
	large: component => component.extend`padding: ${thickness.four} ${thickness.five}`,
	extraLarge: component => component.extend`padding: ${thickness.five} ${thickness.six}`,
};

export default function DemoComponent({ children, variations, buttonProps }) {
	const MappedStyledComponent = applyVariations(Button, variationMap, variations);

	return (
		<ThemeProvider theme={theme}>
			<MappedStyledComponent {...buttonProps || {}}>{children}</MappedStyledComponent>
		</ThemeProvider>
	);
}

DemoComponent.propTypes = forbidExtraProps({
	children: PropTypes.node.isRequired,
	theme: PropTypes.object,
	variations: PropTypes.array,
	buttonProps: PropTypes.object,
});

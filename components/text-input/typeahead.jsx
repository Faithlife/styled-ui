import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	AsyncTypeahead as _AsyncTypeahead,
	Typeahead as _Typeahead,
	Token as _Token,
	Menu as _Menu,
	MenuItem as _MenuItem,
} from 'react-bootstrap-typeahead';
import { SolidTriangleIcon as _SolidTriangleIcon } from '../icons';
import { BootstrapContainer } from '../utils';
import './custom.scss';

const SolidTriangleIcon = styled(_SolidTriangleIcon)`
	transform: rotateZ(90deg);
	color: #7a7a7a;
	height: 8px;
	width: 8px;
	cursor: pointer;
	pointer-events: none;
`;

const StyledAsyncTypeahead = styled(_AsyncTypeahead)`
	.rbt-highlight-text {
		padding: 0;
		font-weight: bold;
		background-color: inherit;
	}

	&& .rbt-input {
		padding-right: 16px;
	}

	&&& {
		.rbt-token-remove-button {
			top: 0;
		}
	}
`;

const StyledTypeahead = styled(_Typeahead)`
	.rbt-highlight-text {
		padding: 0;
		font-weight: bold;
		background-color: inherit;
	}

	&& .rbt-input {
		padding-right: 16px;
	}

	&&& {
		.rbt-token-remove-button {
			top: 0;
		}
	}
`;

const IndicatorContainer = styled.div`
	pointer-events: none;
	position: absolute;
	right: 6px;
	top: calc(50% - 4px);
	display: flex;

	&:hover {
		cursor: pointer;
	}
`;

const RelativeContainer = styled.div`
	position: relative;
`;

export class AsyncTypeahead extends React.Component {
	static propTypes = { inferred: PropTypes.bool };

	componentDidMount() {
		console.warn(
			'Warning: You are using a deprecated `AsyncTypeahead` element. \n',
			'You can find the deprecation documentation here: https://faithlife.github.io/styled-ui/#/text-input/typeahead \n',
			'And you can find the documentation for the element that has replaced this one here: https://faithlife.github.io/styled-ui/#/text-input/select',
		);
	}

	render() {
		const { inferred, ...otherProps } = this.props;
		return (
			<BootstrapContainer>
				<RelativeContainer>
					<StyledAsyncTypeahead {...otherProps} />
					{!inferred && (
						<IndicatorContainer>
							<SolidTriangleIcon />
						</IndicatorContainer>
					)}
				</RelativeContainer>
			</BootstrapContainer>
		);
	}
}

export class Typeahead extends React.Component {
	static propTypes = { inferred: PropTypes.bool };

	componentDidMount() {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(
				'Warning: You are using a deprecated `Typeahead` element. \n',
				'You can find the deprecation documentation here: https://faithlife.github.io/styled-ui/#/text-input/typeahead \n',
				'And you can find the documentation for the element that has replaced this one here: https://faithlife.github.io/styled-ui/#/text-input/select',
			);
		}
	}

	render() {
		const { inferred, ...otherProps } = this.props;
		return (
			<BootstrapContainer>
				<RelativeContainer>
					<StyledTypeahead {...otherProps} />
					{!inferred && (
						<IndicatorContainer>
							<SolidTriangleIcon />
						</IndicatorContainer>
					)}
				</RelativeContainer>
			</BootstrapContainer>
		);
	}
}

export const Token = _Token;
export const Menu = _Menu;
export const MenuItem = _MenuItem;

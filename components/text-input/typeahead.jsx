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

export const Typeahead = ({ inferred, ...props }) => (
	<BootstrapContainer>
		<RelativeContainer>
			<StyledTypeahead {...props} />
			{!inferred && (
				<IndicatorContainer>
					<SolidTriangleIcon />
				</IndicatorContainer>
			)}
		</RelativeContainer>
	</BootstrapContainer>
);

export const AsyncTypeahead = ({ inferred, ...props }) => (
	<BootstrapContainer>
		<RelativeContainer>
			<StyledAsyncTypeahead {...props} />
			{!inferred && (
				<IndicatorContainer>
					<SolidTriangleIcon />
				</IndicatorContainer>
			)}
		</RelativeContainer>
	</BootstrapContainer>
);

Typeahead.propTypes = {
	inferred: PropTypes.bool,
};

AsyncTypeahead.propTypes = {
	inferred: PropTypes.bool,
};

export const Token = _Token;
export const Menu = _Menu;
export const MenuItem = _MenuItem;

import React from 'react';
import styled from 'styled-components';
import {
	AsyncTypeahead as _AsyncTypeahead,
	Typeahead as _Typeahead,
} from 'react-bootstrap-typeahead';
import { BootstrapContainer } from '../utils';
import './custom.scss';

const StyledAsyncTypeahead = styled(_AsyncTypeahead)`
	.rbt-highlight-text {
		padding: 0;
		font-weight: bold;
		background-color: inherit;
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

	&&& {
		.rbt-token-remove-button {
			top: 0;
		}
	}
`;

export const AsyncTypeahead = props => (
	<BootstrapContainer>
		<StyledAsyncTypeahead {...props} />
	</BootstrapContainer>
);

export const Typeahead = props => (
	<BootstrapContainer>
		<StyledTypeahead {...props} />
	</BootstrapContainer>
);

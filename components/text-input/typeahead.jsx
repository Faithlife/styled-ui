import styled from 'styled-components';
import { Typeahead as _Typeahead } from 'react-bootstrap-typeahead';
import './custom.scss';

export const Typeahead = styled(_Typeahead)`
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

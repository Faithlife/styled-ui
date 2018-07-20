import styled from 'styled-components';
import { Typeahead } from 'react-bootstrap-typeahead';
import './custom.scss';

export default styled(Typeahead)`
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

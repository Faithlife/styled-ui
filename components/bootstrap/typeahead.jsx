import styled from 'styled-components';
import { Typeahead } from 'react-bootstrap-typeahead';
import { wrapBootstrap } from './util';

export default styled(wrapBootstrap(Typeahead))`
	.rbt-highlight-text {
		padding: 0;
		font-weight: bold;
		background-color: inherit;
	}
`;

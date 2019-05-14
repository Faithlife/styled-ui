import styled from 'styled-components';
import { mediaSizes } from '../shared-styles';
import { resetStyles } from '../utils';

export const Indicator = styled.div`
	${resetStyles};

	grid-column: indicator;
	grid-row: 1;

	margin-top: 16px;
	margin-right: 16px;

	@media (min-width: ${mediaSizes.tablet}) {
		margin-right: 24px;
	}
`;

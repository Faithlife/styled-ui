import styled from 'styled-components';
import { system } from 'styled-system';
import { boxStyles } from './Box';
import { theme } from '../theme';

export const Stack = styled.div`
	${boxStyles};

	> * + * {
		${system({
			spacing: {
				property: 'margin-top',
				scale: 'space',
			},
		})}
	}
`;

Stack.defaultProps = { theme };

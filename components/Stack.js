import styled from 'styled-components';
import { system } from 'styled-system';
import { box } from '../theme/system';

import { theme } from '../theme';

export const Stack = styled.div`
	${box};

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

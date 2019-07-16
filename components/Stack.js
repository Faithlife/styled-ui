import styled from 'styled-components';
import { system } from 'styled-system';
import { Box } from './Box';
import { theme } from '../theme';

export const Stack = styled(Box)`
	> * + * {
		${system({
			spacing: {
				property: 'margin-top',
				scale: 'space',
			},
		})}
	}
`;

Stack.defaultProps.theme = theme;

import styled from 'styled-components';
import { system } from 'styled-system';
import { Box } from './Box';

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

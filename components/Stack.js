import PropTypes from 'prop-types';
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
Stack.propTypes = {
	...box.propTypes,
	spacing: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
	]),
};

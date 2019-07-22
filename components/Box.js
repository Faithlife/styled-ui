import styled from 'styled-components';
import { layout, flexbox, position, grid, shadow, border, background } from 'styled-system';
import { common } from '../theme/system';
import { theme } from '../theme';

export const Box = styled.div`
	box-sizing: 'border-box';
	min-width: 0;

	${common};
	${layout};
	${flexbox};
	${position};
	${grid};
	${shadow};
	${border};
	${background};
`;

Box.defaultProps.theme = theme;

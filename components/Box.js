import styled from 'styled-components';
import { box } from '../theme/system';
import { theme } from '../theme';

export const Box = styled.div`
	box-sizing: border-box;
	min-width: 0;
	${box}
`;

Box.defaultProps = { theme };
Box.propTypes = { ...box.propTypes };

import styled from 'styled-components';
import { box } from '../theme/system';
import { theme } from '../theme';

export const Box = styled.div(box);

Box.defaultProps = { theme };
Box.propTypes = { ...box.propTypes };

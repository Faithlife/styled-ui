import styled from 'styled-components';
import {
	compose,
	layout,
	flexbox,
	position,
	grid,
	shadow,
	border,
	background,
} from 'styled-system';
import { common } from '../theme/system';
import { theme } from '../theme';

export const boxStyles = compose(
	{
		boxSizing: 'border-box',
		minWidth: 0,
	},
	common,
	layout,
	flexbox,
	position,
	grid,
	shadow,
	border,
	background,
);

export const Box = styled.div(boxStyles);

Box.defaultProps = { theme };

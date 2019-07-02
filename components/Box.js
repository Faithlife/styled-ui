import styled from 'styled-components';
import { layout, flexbox, position, grid, shadow, border, background } from 'styled-system';
import { common } from '../theme/system';

export const Box = styled.div(
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

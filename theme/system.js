import * as styledSystem from 'styled-system';
import themeGet from '@styled-system/theme-get';
import { theme } from './core';

const { get: getKey, compose } = styledSystem;

export const get = key => themeGet(key, getKey(theme, key));

export const common = compose(
	styledSystem.space,
	styledSystem.color,
	styledSystem.display,
);

export const typography = compose(
	styledSystem.typography,
	styledSystem.system({
		textTransform: true,
	}),
);

export const box = compose(
	{
		boxSizing: 'border-box',
		minWidth: 0,
	},
	common,
	styledSystem.layout,
	styledSystem.flexbox,
	styledSystem.position,
	styledSystem.grid,
	styledSystem.shadow,
	styledSystem.border,
	styledSystem.background,
);

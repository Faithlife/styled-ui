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

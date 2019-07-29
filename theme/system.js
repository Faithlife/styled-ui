import * as styledSystem from 'styled-system';
import PropTypes from 'prop-types';
import systemPropTypes from '@styled-system/prop-types';
import themeGet from '@styled-system/theme-get';
import { theme } from './core';

const { get: getKey, compose } = styledSystem;

export const get = key => themeGet(key, getKey(theme, key));

export const common = compose(
	styledSystem.space,
	styledSystem.color,
	styledSystem.display,
);

common.propTypes = {
	...systemPropTypes.space,
	...systemPropTypes.color,
	...systemPropTypes.display,
};

export const typography = compose(
	styledSystem.typography,
	styledSystem.system({
		textTransform: true,
	}),
);

common.propTypes = {
	...systemPropTypes.typography,
	textTransform: PropTypes.string,
};

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

common.propTypes = {
	...common.propTypes,
	...systemPropTypes.layout,
	...systemPropTypes.flexbox,
	...systemPropTypes.position,
	...systemPropTypes.grid,
	...systemPropTypes.shadow,
	...systemPropTypes.border,
	...systemPropTypes.background,
};

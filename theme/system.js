import * as styledSystem from 'styled-system';
import PropTypes from 'prop-types';
import systemPropTypes from '@styled-system/prop-types';
import themeGet from '@styled-system/theme-get';
import { theme } from './core';

const { get: getKey, compose } = styledSystem;

const responsivePropType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.arrayOf(PropTypes.string),
]);

export const get = key => themeGet(key, getKey(theme, key));

export const common = compose(
	styledSystem.space,
	styledSystem.color,
	styledSystem.display,
	styledSystem.system({
		pointerEvents: true,
		transform: true,
		transition: true,
	}),
);

common.propTypes = {
	...systemPropTypes.space,
	...systemPropTypes.color,
	...systemPropTypes.display,
	transform: responsivePropType,
	transition: responsivePropType,
};

export const typography = compose(
	styledSystem.typography,
	styledSystem.system({
		textTransform: true,
		whiteSpace: true,
		textOverflow: true,
	}),
);

typography.propTypes = {
	...systemPropTypes.typography,
	textTransform: responsivePropType,
};

export const box = compose(
	common,
	styledSystem.layout,
	styledSystem.flexbox,
	styledSystem.position,
	styledSystem.grid,
	styledSystem.shadow,
	styledSystem.border,
	styledSystem.background,
	styledSystem.lineHeight,
);

box.propTypes = {
	...common.propTypes,
	...systemPropTypes.layout,
	...systemPropTypes.flexbox,
	...systemPropTypes.position,
	...systemPropTypes.grid,
	...systemPropTypes.shadow,
	...systemPropTypes.border,
	...systemPropTypes.background,
	...systemPropTypes.lineHeight,
};

/**
 * A version of Styled System's `layout` utility that leaves out the `size` prop (to avoid conflicts
 * with other props named `size`).
 *
 * Adapted from https://github.com/styled-system/styled-system/blob/92bcdc3c0ff3ec561924e8f8aa793c8a835d0783/packages/layout/src/index.js,
 * (c) 2017-2018 Brent Jackson, released under the MIT License (https://github.com/styled-system/styled-system/blob/92bcdc3c0ff3ec561924e8f8aa793c8a835d0783/LICENSE.md).
 */

import { system, get } from 'styled-system';

const isNumber = n => typeof n === 'number' && !isNaN(n);
const getWidth = (n, scale) => get(scale, n, !isNumber(n) || n > 1 ? n : n * 100 + '%');

const config = {
	width: {
		property: 'width',
		scale: 'sizes',
		transform: getWidth,
	},
	height: {
		property: 'height',
		scale: 'sizes',
	},
	minWidth: {
		property: 'minWidth',
		scale: 'sizes',
	},
	minHeight: {
		property: 'minHeight',
		scale: 'sizes',
	},
	maxWidth: {
		property: 'maxWidth',
		scale: 'sizes',
	},
	maxHeight: {
		property: 'maxHeight',
		scale: 'sizes',
	},
	// size: {
	// 	properties: ['width', 'height'],
	// 	scale: 'sizes',
	// },
	overflow: true,
	overflowX: true,
	overflowY: true,
	display: true,
	verticalAlign: true,
};

export const layoutExceptSize = system(config);
export default layoutExceptSize;

import { theme as coreTheme, breakpoints, mediaQueries } from './core';
import { textStyles } from './textStyles';

const theme = {
	...coreTheme,
	textStyles,
};

export { theme, breakpoints, mediaQueries };

import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { theme as coreTheme } from './core';
import { textStyles } from './textStyles';
import { buttons, buttonSizes } from './buttons';

export const theme = {
	...coreTheme,
	textStyles,
	buttons,
	buttonSizes,
};

export function useTheme() {
	return useContext(ThemeContext) || theme;
}

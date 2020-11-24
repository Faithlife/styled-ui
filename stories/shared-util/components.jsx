import React from 'react';
import { theme } from '../../index';

export const ThemeList = ({ items, render }) => {
	return <>{[...Object.entries(items(theme))].map(render)}</>;
};

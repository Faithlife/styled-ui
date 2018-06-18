/* eslint-disable react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog, pageLoader } from 'catalog';
import { Button, Checkbox, TextInput, Bootstrap } from '../components';
import { colors } from '../components/shared-styles';
import DocgenTable from './docgen-table.jsx';
import '../dist/bootstrap-custom.css';

function delayPromise(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

const pages = [
	{
		path: '/',
		title: 'Welcome',
		content: pageLoader(() => import('./WELCOME.md')),
	},
	{
		title: 'Button',
		pages: [
			{
				path: '/button/variations',
				title: 'Variations',
				content: pageLoader(() => import('./button/variations.md')),
				imports: { Button },
			},
			{
				path: '/button/ok-cancel',
				title: 'OK Cancel',
				content: pageLoader(() => import('./button/ok-cancel.md')),
				imports: { Button },
			},
			{
				path: '/button/documentation',
				title: 'Documentation',
				content: pageLoader(() => import('./button/documentation.md')),
				imports: { Button, DocgenTable },
			},
		],
	},
	{
		title: 'Checkbox',
		pages: [
			{
				path: '/checkbox/variations',
				title: 'Variations',
				content: pageLoader(() => import('./checkbox/variations.md')),
				imports: { Checkbox },
			},
			{
				path: '/checkbox/documentation',
				title: 'Documentation',
				content: pageLoader(() => import('./checkbox/documentation.md')),
				imports: { Checkbox, DocgenTable },
			},
		],
	},
	{
		title: 'Text input',
		pages: [
			{
				path: '/text-input/variations',
				title: 'Variations',
				content: pageLoader(() => import('./text-input/variations.md')),
				imports: { ...TextInput, Button, delayPromise },
			},
			{
				path: '/text-input/documentation',
				title: 'Documentation',
				content: pageLoader(() => import('./text-input/documentation.md')),
				imports: { ...TextInput, DocgenTable },
			},
		],
	},
	{
		title: 'Design Styles',
		pages: [
			{
				path: '/design-styles/colors',
				title: 'Colors',
				content: pageLoader(() => import('./design-styles/colors.md')),
			},
		],
	},
	{
		title: 'Bootstrap',
		pages: [
			{
				path: '/bootstrap/components',
				title: 'Components',
				content: pageLoader(() => import('./bootstrap/components.md')),
				imports: { ...Bootstrap },
			},
		],
	},
];

ReactDOM.render(
	<Catalog
		title="Catalog"
		pages={pages}
		logoSrc="faithlife-logo.svg"
		theme={{
			fontFamily: 'Source Sans Pro',
			pageHeadingBackground: colors.flGray,
		}}
	/>,
	document.getElementById('catalog'),
);

/* eslint-disable react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog, pageLoader } from 'catalog';
import { Button, Checkbox, TextInput } from '../components';

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
				path: '/buttons/variations',
				title: 'Variations',
				content: pageLoader(() => import('./button/variations.md')),
				imports: { Button },
			},
			{
				path: '/buttons/ok-cancel',
				title: 'OK Cancel',
				content: pageLoader(() => import('./button/ok-cancel.md')),
				imports: { Button },
			},
		],
	},
	{
		path: '/checkbox',
		title: 'Check box',
		content: pageLoader(() => import('./checkbox/variations.md')),
		imports: { Checkbox },
	},
	{
		path: '/text-input',
		title: 'Text input',
		content: pageLoader(() => import('./text-input/variations.md')),
		imports: { ...TextInput, Button, delayPromise },
	},
];

ReactDOM.render(<Catalog title="Catalog" pages={pages} />, document.getElementById('catalog'));

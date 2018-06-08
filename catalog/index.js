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
		path: '/button',
		title: 'Button',
		content: pageLoader(() => import('./button.md')),
		imports: { Button },
	},
	{
		path: '/checkbox',
		title: 'Check box',
		content: pageLoader(() => import('./checkbox.md')),
		imports: { Checkbox },
	},
	{
		path: '/text-input',
		title: 'Text input',
		content: pageLoader(() => import('./textinput.md')),
		imports: { ...TextInput, Button, delayPromise },
	},
];

ReactDOM.render(<Catalog title="Catalog" pages={pages} />, document.getElementById('catalog'));

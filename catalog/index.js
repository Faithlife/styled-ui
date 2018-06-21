/* eslint-disable react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog, pageLoader } from 'catalog';
import { Button, Checkbox, TextInput, Bootstrap, Modal } from '../components';
import { colors } from '../components/shared-styles';
import CarouselDemo from './bootstrap/carousel-demo.jsx';
import DocgenTable from './docgen-table.jsx';
import '../dist/styles.css';

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
		title: 'Bootstrap',
		pages: [
			{
				path: '/bootstrap/components',
				title: 'Standard Components',
				content: pageLoader(() => import('./bootstrap/components.md')),
				imports: { ...Bootstrap, CarouselDemo },
			},
			{
				path: '/bootstrap/typeahead',
				title: 'Typeahead',
				content: pageLoader(() => import('./bootstrap/typeahead.md')),
				imports: { ...Bootstrap },
			},
		],
	},
	{
		title: 'Experimental',
		pages: [
			{
				path: '/button/variations',
				title: 'Button Variations',
				content: pageLoader(() => import('./button/variations.md')),
				imports: { Button },
			},
			{
				path: '/button/ok-cancel',
				title: 'Button OK Cancel',
				content: pageLoader(() => import('./button/ok-cancel.md')),
				imports: { Button },
			},
			{
				path: '/button/documentation',
				title: 'Button Documentation',
				content: pageLoader(() => import('./button/documentation.md')),
				imports: { Button, DocgenTable },
			},
			{
				path: '/checkbox/variations',
				title: 'Checkbox Variations',
				content: pageLoader(() => import('./checkbox/variations.md')),
				imports: { Checkbox },
			},
			{
				path: '/checkbox/documentation',
				title: 'Checkbox Documentation',
				content: pageLoader(() => import('./checkbox/documentation.md')),
				imports: { Checkbox, DocgenTable },
			},
			{
				path: '/text-input/variations',
				title: 'Text input Variations',
				content: pageLoader(() => import('./text-input/variations.md')),
				imports: { ...TextInput, Button, delayPromise },
			},
			{
				path: '/text-input/documentation',
				title: 'Text input Documentation',
				content: pageLoader(() => import('./text-input/documentation.md')),
				imports: { ...TextInput, DocgenTable },
			},
			{
				path: '/modal/example',
				title: 'Modal Example',
				content: pageLoader(() => import('./modal/modal.md')),
				imports: { ...TextInput, ...Modal, Button, delayPromise },
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
];

ReactDOM.render(
	<Catalog
		title="Catalog"
		pages={pages}
		logoSrc="faithlife-logo.svg"
		theme={{
			fontFamily: 'Roboto',
			pageHeadingBackground: colors.flGray,
		}}
	/>,
	document.getElementById('catalog'),
);

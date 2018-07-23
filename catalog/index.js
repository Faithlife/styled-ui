/* eslint-disable react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Catalog, pageLoader } from 'catalog';
import {
	Bootstrap,
	Button,
	Checkbox,
	TextInput,
	Modal,
	ModalFooter,
	LoadingSpinner,
	InferredText,
	Typeahead,
} from '../components/main.js';
import { colors } from '../components/shared-styles';
import { CarouselDemo } from './bootstrap/carousel-demo.jsx';
import { DocgenTable } from './docgen-table.jsx';
import { MemberDirectory, VolunteerScheduling } from './grid';

// SVG icons embedded in SASS stylesheets do not work properly with catalog,
// so the stylesheets must be built by a separate webpack build.
import '../dist/main.css';
import '../dist/ag-grid.css';

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
				imports: {
					...Bootstrap,
					CarouselDemo,
					RowWithMargin: styled(Bootstrap.Row)`
						margin-bottom: 1rem;
					`,
				},
			},
			{
				path: '/bootstrap/typeahead',
				title: 'Typeahead',
				content: pageLoader(() => import('./bootstrap/typeahead.md')),
				imports: { Typeahead, ...Bootstrap },
			},
			{
				path: '/bootstrap/inferred',
				title: 'Inferred Inputs',
				content: pageLoader(() => import('./bootstrap/inferred.md')),
				imports: { ...InferredText, ...Bootstrap, DocgenTable },
			},
		],
	},
	{
		title: 'Grid',
		pages: [
			{
				title: 'Variations',
				path: '/grid/variations',
				content: pageLoader(() => import('./grid/variations.md')),
				imports: { MemberDirectory, VolunteerScheduling },
			},
			{
				title: 'Documentation',
				path: '/grid/documentation',
				content: pageLoader(() => import('./grid/documentation.md')),
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
				path: '/modal/variations',
				title: 'Modal Variations',
				content: pageLoader(() => import('./modal/variations.md')),
				imports: { ...TextInput, Modal, ModalFooter, Button, delayPromise },
			},
			{
				path: '/modal/documentation',
				title: 'Modal Documentation',
				content: pageLoader(() => import('./modal/documentation.md')),
				imports: { Modal, DocgenTable },
			},
			{
				path: '/loading-spinner/variations',
				title: 'Loading Spinner Variations',
				content: pageLoader(() => import('./loading-spinner/variations.md')),
				imports: { LoadingSpinner },
			},
			{
				path: '/loading-spinner/documentation',
				title: 'Loading Spinner Documentation',
				content: pageLoader(() => import('./loading-spinner/documentation.md')),
				imports: { LoadingSpinner, DocgenTable },
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

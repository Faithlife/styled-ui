/* eslint-disable react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Catalog, pageLoader } from 'catalog';
import {
	Bootstrap,
	Button,
	Checkbox,
	Modal,
	ModalFooter,
	LoadingSpinner,
	HelpBox,
	Collapse,
	GroupSelector,
} from '../components/main.js';
import { BootstrapContainer } from '../components/utils';
import { Typeahead, InferredText, InferredTypeahead } from '../components/text-input';
import { colors } from '../components/shared-styles';
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
					RowWithMargin: styled(Bootstrap.Row)`
						margin-bottom: 1rem;
					`,
					LayoutGridDemo: styled.div`
						.container .row > [class^='col'] {
							padding-top: 0.75rem;
							padding-bottom: 0.75rem;
							background-color: #e5edf5;
							border: 1px solid #c9c1d5;
							color: #5f5f5f;
						}
					`,
				},
			},
			{
				path: '/bootstrap/stylesheet',
				title: 'Stylesheet',
				content: pageLoader(() => import('./bootstrap/stylesheet.md')),
			},
		],
	},
	{
		title: 'Button',
		pages: [
			{
				path: '/button/variations',
				title: 'Button Variations',
				content: pageLoader(() => import('./button/variations.md')),
				imports: {
					Button,
					ButtonDemo: styled.div`
						&& > * {
							margin: 8px;
						}
					`,
				},
			},
			{
				path: '/button/ok-cancel',
				title: 'Button OK Cancel',
				content: pageLoader(() => import('./button/ok-cancel.md')),
				imports: {
					Button,
					ButtonDemo: styled.div`
						&& > * {
							margin: 8px;
						}
					`,
				},
			},
			{
				path: '/button/documentation',
				title: 'Button Documentation',
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
				title: 'Checkbox Variations',
				content: pageLoader(() => import('./checkbox/variations.md')),
				imports: {
					Checkbox,
					CheckboxDemo: styled.div`
						&& > * {
							margin: 8px;
						}
					`,
				},
			},
			{
				path: '/checkbox/documentation',
				title: 'Checkbox Documentation',
				content: pageLoader(() => import('./checkbox/documentation.md')),
				imports: { Checkbox, DocgenTable },
			},
		],
	},
	{
		title: 'Collapse',
		pages: [
			{
				path: '/collapse/variations',
				title: 'Collapse Variations',
				content: pageLoader(() => import('./collapse/variations.md')),
				imports: { Collapse, BootstrapContainer, Button: Bootstrap.Button },
			},
			{
				path: '/collapse/documentation',
				title: 'Collapse Documentation',
				content: pageLoader(() => import('./collapse/documentation.md')),
				imports: { Collapse, DocgenTable },
			},
			{
				path: '/group-selector/variations',
				title: 'Group Selector Variations',
				content: pageLoader(() => import('./group-selector/variations.md')),
				imports: {
					GroupSelector,
					Button: Bootstrap.Button,
					GroupSelectorDemo: styled.div`
						font-family: 'Source Sans Pro';
						color: #333333;

						.wide-content {
							width: 600px;
						}

						.button-container {
							margin-right: 16px;
						}

						.stacked-content {
							width: 240px;
						}
					`,
				},
			},
			{
				path: '/group-selector/documentation',
				title: 'Group Selector Documentation',
				content: pageLoader(() => import('./group-selector/documentation.md')),
				imports: { GroupSelector, DocgenTable },
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
		title: 'Help Box',
		pages: [
			{
				path: '/help-box/variations',
				title: 'Help Box Variations',
				content: pageLoader(() => import('./help-box/variations.md')),
				imports: {
					HelpBox,
					Demo: styled.div`
						font-family: Source Sans Pro;
						color: #333;
					`,
				},
			},
			{
				path: '/help-box/documentation',
				title: 'Help Box Documentation',
				content: pageLoader(() => import('./help-box/documentation.md')),
				imports: { HelpBox, DocgenTable },
			},
		],
	},
	{
		title: 'Loading Spinner',
		pages: [
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
		title: 'Modal',
		pages: [
			{
				path: '/modal/variations',
				title: 'Modal Variations',
				content: pageLoader(() => import('./modal/variations.md')),
				imports: {
					Input: Bootstrap.Input,
					Modal,
					ModalFooter,
					Button,
					delayPromise,
					ModalDemo: styled.div`
						font-family: 'Source Sans Pro';
						color: #333333;

						.wide-content {
							width: 600px;
						}

						.button-container {
							margin-right: 16px;
						}

						.stacked-content {
							width: 240px;
						}
					`,
				},
			},
			{
				path: '/modal/documentation',
				title: 'Modal Documentation',
				content: pageLoader(() => import('./modal/documentation.md')),
				imports: { Modal, DocgenTable },
			},
		],
	},
	{
		title: 'Text Input',
		pages: [
			{
				path: '/text-input/typeahead',
				title: 'Typeahead',
				content: pageLoader(() => import('./text-input/typeahead.md')),
				imports: { Typeahead, ...Bootstrap },
			},
			{
				path: '/text-input/inferred',
				title: 'Inferred Inputs',
				content: pageLoader(() => import('./text-input/inferred.md')),
				imports: { InferredText, InferredTypeahead, ...Bootstrap, DocgenTable },
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

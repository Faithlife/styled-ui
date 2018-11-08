/* eslint-disable react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Catalog, pageLoader } from 'catalog';
import {
	AnchorButton,
	Bootstrap,
	Button,
	Checkbox,
	Radio,
	Modal,
	ModalFooter,
	LoadingSpinner,
	HelpBox,
	Collapse,
	FilesSection,
	DropZone,
	SimpleModal,
	Popover,
	PopoverManager,
	PopoverReference,
	Tooltip,
} from '../components/main.js';
import { BaseButton } from '../components/button/base-button.jsx';
import { BootstrapContainer } from '../components/utils';
import { Typeahead, InferredText, InferredTypeahead } from '../components/text-input';
import { GroupSelector, GroupSelectorModal } from '../components/group-selector';
import { ShareDialog } from '../components/share-dialog';
import { GearIcon } from '../components/icons';
import { colors } from '../components/shared-styles';
import { DocgenTable } from './docgen-table.jsx';
import { MemberDirectory, VolunteerScheduling } from './grid';
import { InferredTextFocusDemo, InferredTypeaheadFocusDemo } from './text-input/demos.jsx';

// SVG icons embedded in SASS stylesheets do not work properly with catalog,
// so the stylesheets must be built by a separate webpack build.
import '../dist/main.css';
import '../dist/ag-grid.css';

const ButtonDemo = styled.div`
	display: grid;
	grid-auto-flow: column;
	align-items: center;
	grid-column-gap: 12px;
	width: min-content;
`;

const ButtonGrid = styled.div`
	display: grid;
	grid-auto-flow: row;
	grid-row-gap: 4px;
	width: 200px;
`;

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
					ButtonDemo,
					ButtonGrid,
					GearIcon,
					buttonRef: React.createRef(),
				},
			},
			{
				path: '/button/anchor-button',
				title: 'Anchor Button',
				content: pageLoader(() => import('./button/anchor-button.md')),
				imports: {
					AnchorButton,
					GearIcon,
					ButtonDemo,
				},
			},
			{
				path: '/button/ok-cancel',
				title: 'Button OK Cancel',
				content: pageLoader(() => import('./button/ok-cancel.md')),
				imports: {
					Button,
					ButtonDemo,
				},
			},
			{
				path: '/button/documentation',
				title: 'Button Documentation',
				content: pageLoader(() => import('./button/documentation.md')),
				imports: { BaseButton, Button, AnchorButton, DocgenTable },
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
		title: 'Radio',
		pages: [
			{
				path: '/radio/variations',
				title: 'Radio Variations',
				content: pageLoader(() => import('./radio/variations.md')),
				imports: {
					Radio,
					RadioDemo: styled.div`
						&& > * {
							margin: 8px;
						}
					`,
				},
			},
			{
				path: '/radio/documentation',
				title: 'Radio Documentation',
				content: pageLoader(() => import('./radio/documentation.md')),
				imports: { Radio, DocgenTable },
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
		title: 'Group Selector',
		pages: [
			{
				path: '/group-selector/variations',
				title: 'Group Selector Variations',
				content: pageLoader(() => import('./group-selector/variations.md')),
				imports: {
					GroupSelector,
					Button: Bootstrap.Button,
					GroupSelectorDemo: styled.div`
						font-family: Source Sans Pro;
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
			{
				path: '/group-selector-modal/variations',
				title: 'Group Selector Modal Variations',
				content: pageLoader(() => import('./group-selector-modal/variations.md')),
				imports: {
					GroupSelectorModal,
					Button: Bootstrap.Button,
					GroupSelectorModalDemo: styled.div`
						font-family: Source Sans Pro;
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
				path: '/group-selector-modal/documentation',
				title: 'Group Selector Modal Documentation',
				content: pageLoader(() => import('./group-selector-modal/documentation.md')),
				imports: { GroupSelectorModal, DocgenTable },
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
		title: 'SimpleModal',
		pages: [
			{
				path: '/simple-modal/variations',
				title: 'Simple Modal Variations',
				content: pageLoader(() => import('./simple-modal/variations.md')),
				imports: {
					SimpleModal,
					Button,
					Popover,
					PopoverManager,
					PopoverReference,
					SimpleModalDemo: styled.div`
						font-family: 'Source Sans Pro';
						color: #333333;

						.modal-content {
							margin-top: 20px;
							margin-bottom: 20px;
							width: 300px;
							height: 200px;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: space-around;
						}

						.message {
							background-color: #eeeeee;
							padding: 20px;
						}

						.success {
							width: 60px;
						}
					`,
				},
			},
			{
				path: '/simple-modal/documentation',
				title: 'SimpleModal Documentation',
				content: pageLoader(() => import('./simple-modal/documentation.md')),
				imports: { SimpleModal, DocgenTable },
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
				imports: {
					InferredTextFocusDemo,
					InferredTypeaheadFocusDemo,
					InferredText,
					InferredTypeahead,
					...Bootstrap,
					DocgenTable,
				},
			},
		],
	},
	{
		title: 'Files Section',
		pages: [
			{
				path: '/files-section/variations',
				title: 'Files Section Variations',
				content: pageLoader(() => import('./files-section/variations.md')),
				imports: {
					FilesSection,
					Button,
					LoadingSpinner,
					FilesSectionDemo: styled.div`
						font-family: 'Source Sans Pro';
					`,
				},
			},
			{
				path: 'files-section/documentation',
				title: 'Files Section Documentation',
				content: pageLoader(() => import('./files-section/documentation.md')),
				imports: { FilesSection, DocgenTable },
			},
		],
	},
	{
		title: 'Drop Zone',
		pages: [
			{
				path: '/drop-zone/variations',
				title: 'Drop Zone Variations',
				content: pageLoader(() => import('./drop-zone/variations.md')),
				imports: {
					DropZone,
					DropZoneDemo: styled.div`
						font-family: 'Source Sans Pro';
					`,
					DroppedFiles: styled.div`
						margin-top: 16px;
					`,
					DropZoneMessage: styled.div`
						font-size: 20px;
						max-width: 240px;
						text-align: center;
					`,
					IconsContainer: styled.div`
						color: #a8a8a8;
						> * {
							margin: 0 12px;
						}
					`,
				},
			},
			{
				path: 'drop-zone/documentation',
				title: 'Drop Zone Documentation',
				content: pageLoader(() => import('./drop-zone/documentation.md')),
				imports: { DropZone, DocgenTable },
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
		title: 'Share Dialog',
		pages: [
			{
				path: '/share-dialog/variations',
				title: 'Share Dialog Variations',
				content: pageLoader(() => import('./share-dialog/variations.md')),
				imports: {
					Input: Bootstrap.Input,
					Modal,
					ModalFooter,
					Button,
					delayPromise,
					ShareDialog,
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
				path: 'share-dialog/documentation',
				title: 'Share Dialog Documentation',
				content: pageLoader(() => import('./share-dialog/documentation.md')),
				imports: { ShareDialog, DocgenTable },
			},
		],
	},
	{
		title: 'Popover',
		pages: [
			{
				path: '/popover/variations',
				title: 'Popover Variations',
				content: pageLoader(() => import('./popover/variations.md')),
				imports: {
					Button,
					Popover,
					Tooltip,
					PopoverManager,
					PopoverReference,
					PopoverDemo: styled.div`
						display: flex;
						align-items: flex-start;
						justify-content: space-between;
					`,
					PopoverOverflowDemo: styled.div`
						display: flex;
						align-items: flex-start;
						justify-content: space-around;
						position: relative;
						overflow: hidden;
						padding-top: 20px;
					`,
					StyledDiv: styled.div`
						font-weight: bold;
						color: purple;
					`,
				},
			},
			{
				path: '/popover/documentation',
				title: 'Popover Documentation',
				content: pageLoader(() => import('./popover/documentation.md')),
				imports: { Popover, DocgenTable, Tooltip },
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

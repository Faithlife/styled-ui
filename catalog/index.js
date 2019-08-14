/* eslint-disable react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Catalog, pageLoader } from 'catalog';
import * as dateFunctions from 'date-fns';
import chrono from 'chrono-node';
import {
	Accordion,
	AnchorButton,
	Bootstrap,
	Button,
	Checkbox,
	Collapse,
	DropZone,
	FilesSection,
	HelpBox,
	Input,
	LoadingSpinner,
	Modal,
	ModalFooter,
	Popover,
	PopoverBase,
	PopoverManager,
	PopoverReference,
	Radio,
	SimpleModal,
	Slider,
	Tooltip,
	DatePicker,
	DatePickerInput,
	DatePeriodPicker,
	SimpleToast,
	TabManager,
	Tab,
	SequencedTab,
	TabList,
	SequencedTabList,
	TabPanel,
	TabPanels,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	MenuItem,
	MenuSeparator,
	MenuCheckbox,
	Listbox,
	ListboxToggle,
	ListboxMenu,
	ListItem,
	ParameterSelect,
	ParameterInputBox,
	ParameterSentence,
	FilePicker,
	FileUpload,
	AmberContent,
} from '../components/main';
import { GroupSelector, LargeGroupSelector } from '../components/group-selector';
import { ShareDialog } from '../components/share-dialog';
import { GearIcon } from '../components/icons';
import { colors } from '../components/shared-styles';
import { ProductDrawerWithResources } from './product-drawer';
import { DocgenTable } from './docgen-table';
import { MemberDirectory, VolunteerScheduling } from './grid';
import { textInputPages } from './text-input/pages';
import DownArrow from './svgs/arrow-down.svg';

// SVG icons embedded in SASS stylesheets do not work properly with catalog,
// so the stylesheets must be built by a separate webpack build.
import '../dist/main.css';
import '../dist/text-input.css';
import '../dist/ag-grid.css';

const ButtonDemo = styled.div`
	display: inline-grid;
	grid-auto-flow: column;
	align-items: center;
	grid-column-gap: 12px;
`;

const ButtonGrid = styled.div`
	display: grid;
	grid-auto-flow: row;
	grid-row-gap: 4px;
	width: 200px;
`;

const AccordionIndicatorDemo = ({ isExpanded, onExpansion }) => (
	<input type="checkbox" checked={isExpanded} onChange={onExpansion} tabIndex={-1} />
);

AccordionIndicatorDemo.propTypes = {
	isExpanded: PropTypes.bool,
	onExpansion: PropTypes.func,
};

const FormDemo = styled.form`
	display: inline-grid;
	grid-auto-flow: row;
	grid-row-gap: 12px;
`;

function delayPromise(duration) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

const components = [
	{
		title: 'Accordion',
		pages: [
			{
				path: '/accordion/variations',
				title: 'Accordion Variations',
				content: pageLoader(() => import('./accordion/variations.md')),
				imports: {
					Accordion,
					AccordionDemo: styled.div`
						background: #fff;
						border: 16px solid #f2f2f2;
					`,
					AccordionCustomIndicator: AccordionIndicatorDemo,
					Checkbox,
					Form: FormDemo,
					Input,
				},
			},
			{
				path: '/accordion/documentation',
				title: 'Accordion Documentation',
				content: pageLoader(() => import('./accordion/documentation.md')),
				imports: { Accordion, DocgenTable },
			},
		],
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
				imports: { Button, AnchorButton, DocgenTable },
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
				imports: { Collapse, Button },
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
					Button,
					GroupSelectorDemo: styled.div`
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
					LargeGroupSelector,
					LargeGroupSelectorDemo: styled.div`
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
				imports: { GroupSelector, LargeGroupSelector, DocgenTable },
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
					Button,
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
					Input,
					Modal,
					ModalFooter,
					Button,
					delayPromise,
					ModalDemoWideContent: styled.div`
						width: 600px;
					`,
					ModalDemoButtonContainer: styled.div`
						margin-right: 16px;
					`,
					ModalDemoStackedContent: styled.div`
						width: 240px;
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
		title: 'Simple Modal',
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
					SimpleModalDemoModalContent: styled.div`
						margin-top: 20px;
						margin-bottom: 20px;
						width: 300px;
						height: 200px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
					`,
					SimpleModalDemoMessage: styled.div`
						background-color: #eeeeee;
						padding: 20px;
					`,
					SimpleModalDemoSuccess: styled.div`
						width: 60px;
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
	textInputPages,
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
					Input,
					Modal,
					ModalFooter,
					Button,
					delayPromise,
					ShareDialog,
					ModalDemo: styled.div`
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
					PopoverBase,
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
				imports: { Popover, PopoverBase, DocgenTable, Tooltip, PopoverManager },
			},
		],
	},
	{
		title: 'Date Picker',
		pages: [
			{
				path: '/date-picker/variations',
				title: 'Date Picker Variations',
				content: pageLoader(() => import('./date-picker/variations.md')),
				imports: {
					Button,
					Popover,
					PopoverManager,
					PopoverReference,
					DatePickerDemo: styled.div`
						font-family: Source Sans Pro;

						& button {
							font-family: Source Sans pro;
							font-size: 14px;
						}
					`,
					DatePicker,
					DatePeriodPicker,
					dateFunctions: {
						...dateFunctions,
					},
				},
			},
			{
				path: 'date-picker/documentation',
				title: 'Date Picker Documentation',
				content: pageLoader(() => import('./date-picker/documentation.md')),
				imports: { DatePicker, DatePeriodPicker, DocgenTable },
			},
		],
	},
	{
		title: 'Date Picker Input',
		pages: [
			{
				path: '/date-picker-input/variations',
				title: 'Date Picker Input Variations',
				content: pageLoader(() => import('./date-picker-input/variations.md')),
				imports: {
					DatePickerInput,
					dateFunctions: {
						...dateFunctions,
					},
					parseUserDateString: str => {
						const parsed = chrono.parseDate(str);
						return parsed;
					},
				},
			},
			{
				path: 'date-picker-input/documentation',
				title: 'Date Picker Input Documentation',
				content: pageLoader(() => import('./date-picker-input/documentation.md')),
				imports: { DatePickerInput, DocgenTable },
			},
		],
	},
	{
		title: 'Slider',
		pages: [
			{
				path: '/slider/variations',
				title: 'Slider Variations',
				content: pageLoader(() => import('./slider/variations.md')),
				imports: {
					Slider,
					DocgenTable,
				},
			},
			{
				path: 'slider/documentation',
				title: 'Slider Documentation',
				content: pageLoader(() => import('./slider/documentation.md')),
				imports: { Slider, DocgenTable },
			},
		],
	},
	{
		title: 'Simple Toast',
		pages: [
			{
				path: '/simple-toast/variations',
				title: 'Simple Toast Variations',
				content: pageLoader(() => import('./simple-toast/variations.md')),
				imports: {
					Button,
					ToastDemo: styled.div`
						&& > * {
							margin: 8px;
						}
					`,
					SimpleToast,
					LoadingSpinner,
					toastRef: React.createRef(),
				},
			},
			{
				path: '/simple-toast/documentation',
				title: 'Simple Toast Documentation',
				content: pageLoader(() => import('./simple-toast/documentation.md')),
				imports: { SimpleToast, DocgenTable },
			},
		],
	},
	{
		title: 'Product Drawer',
		pages: [
			{
				path: '/product-drawer/variations',
				title: 'Product Drawer',
				content: pageLoader(() => import('./product-drawer/variations.md')),
				imports: { ProductDrawerWithResources },
			},
			{
				path: '/product-drawer/documentation',
				title: 'Product Drawer Documentation',
				content: pageLoader(() => import('./product-drawer/documentation.md')),
				imports: { ProductDrawerWithResources, DocgenTable },
			},
		],
	},
	{
		title: 'Tabs',
		pages: [
			{
				path: '/tabs/variations',
				title: 'Tabs Variations',
				content: pageLoader(() => import('./tabs/variations.md')),
				imports: {
					TabManager,
					Tab,
					TabList,
					TabPanel,
					TabPanels,
					TabDemo: styled.div`
						padding: 8px;
						background-color: white;

						&& > * {
							margin: 16px;
						}
					`,
					Button,
					createPortal: component => ReactDOM.createPortal(component, document.body),
				},
			},
			{
				path: '/tabs/sequenced-tabs',
				title: 'Sequenced Tabs',
				content: pageLoader(() => import('./tabs/sequenced-tabs.md')),
				imports: {
					TabManager,
					SequencedTab,
					SequencedTabList,
					TabPanels,
					TabPanel,
					TabDemo: styled.div`
						padding: 8px;
						background-color: white;

						&& > * {
							margin: 16px;
						}
					`,
					Button,
					createPortal: component => ReactDOM.createPortal(component, document.body),
				},
			},
			{
				path: '/tabs/documentation',
				title: 'Tabs Documentation',
				content: pageLoader(() => import('./tabs/documentation.md')),
				imports: {
					Tab,
					SequencedTab,
					TabManager,
					DocgenTable,
				},
			},
		],
	},
	{
		title: 'Dropdown',
		pages: [
			{
				path: '/dropdown/variations',
				title: 'Dropdown',
				content: pageLoader(() => import('./dropdown/variations.md')),
				imports: {
					Dropdown,
					DropdownToggle,
					DropdownMenu,
					MenuItem,
					MenuSeparator,
					MenuCheckbox,
					DropdownDemo: styled.div`
						display: flex;
						align-items: flex-start;
						justify-content: space-between;
					`,
					Button,
				},
			},
			{
				path: '/dropdown/documentation',
				title: 'Dropdown Documentation',
				content: pageLoader(() => import('./dropdown/documentation.md')),
				imports: { Dropdown, DropdownToggle, DocgenTable },
			},
			{
				path: '/dropdown/documentation/items',
				title: 'Dropdown Child Documentation',
				content: pageLoader(() => import('./dropdown/item-documentation.md')),
				imports: { MenuItem, MenuCheckbox, MenuSeparator, DocgenTable },
			},
		],
	},
	{
		title: 'Listbox',
		pages: [
			{
				path: '/Listbox/variations',
				title: 'Listbox',
				content: pageLoader(() => import('./listbox/variations.md')),
				imports: {
					Listbox,
					ListboxToggle,
					ListboxMenu,
					ListItem,
					ListboxDemo: styled.div`
						display: flex;
						align-items: baseline;
					`,
					Button,
					browserList: ['Firefox', 'Chrome', 'Opera', 'Edge'],
					Label: styled.span`
						margin-right: 8px;
					`,
					DownArrow: styled.img.attrs({ src: DownArrow })``,
				},
			},
			{
				path: '/listbox/documentation',
				title: 'Listbox Documentation',
				content: pageLoader(() => import('./listbox/documentation.md')),
				imports: { Listbox, ListboxToggle, ListItem, DocgenTable },
			},
		],
	},
	{
		title: 'Parameter Sentence',
		pages: [
			{
				path: '/parameter-sentence/variations',
				title: 'Parameter Sentence',
				content: pageLoader(() => import('./parameter-sentence/variations.md')),
				imports: {
					ParameterSelect,
					ParameterSentenceDemo: styled.div`
						display: flex;
						align-items: baseline;
						${({ addMargin }) => addMargin && '&& > * { margin-right: 16px; }'};
					`,
					scheduleOptions: {
						weekly: 'weekly',
						biweekly: 'biweekly',
						twiceMonthly: 'twice-monthly',
						monthly: 'monthly',
						quarterly: 'quarterly',
						annual: 'annual',
					},
					ParameterInputBox,
					ParameterSentence,
				},
			},
			{
				path: '/parameter-sentence/command-sentence',
				title: 'Command Sentence',
				content: pageLoader(() => import('./parameter-sentence/command-sentence.md')),
				imports: {},
			},
			{
				path: '/parameter-sentence/documentation',
				title: 'Parameter Sentence Documentation',
				content: pageLoader(() => import('./parameter-sentence/documentation.md')),
				imports: { ParameterSentence, ParameterSelect, ParameterInputBox, DocgenTable },
			},
		],
	},
	{
		title: 'File Picker',
		pages: [
			{
				path: '/file-picker/variations',
				title: 'File Picker',
				content: pageLoader(() => import('./file-picker/variations.md')),
				imports: {
					FilePicker,
					FilePickerDemo: styled.div`
						&& > * {
							margin: 8px;
						}
					`,
					FileContainer: styled.div`
						&& > * {
							margin: 8px;
						}
					`,
					TabManager,
					TabList,
					Tab,
					TabPanel,
					TabPanels,
					FileUpload,
					AmberContent,
				},
			},
			{
				path: '/file-picker/documentation',
				title: 'File Picker Documentation',
				content: pageLoader(() => import('./file-picker/documentation.md')),
				imports: { FilePicker, AmberContent, DocgenTable },
			},
		],
	},
].sort((a, b) => {
	if (a.title < b.title) {
		return -1;
	}
	if (a.title > b.title) {
		return 1;
	}
	return 0;
});

const pages = [
	{
		path: '/',
		title: 'Welcome',
		content: pageLoader(() => import('./WELCOME.md')),
	},
	...components,
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

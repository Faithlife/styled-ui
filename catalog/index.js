/* eslint-disable react/jsx-indent */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import { Catalog, pageLoader } from 'catalog';
import * as dateFunctions from 'date-fns';
import chrono from 'chrono-node';
import {
	Accordion,
	Button,
	ButtonSelect,
	Checkbox,
	Collapse,
	DatePicker,
	DatePickerInput,
	DatePeriodPicker,
	DropZone,
	FilesSection,
	HelpBox,
	Input,
	Listbox,
	LoadingSpinner,
	Menu,
	Modal,
	MultiButton,
	ParameterSentence,
	Popover,
	Tooltip,
	Radio,
	SegmentedButtonGroup,
	SequencedTab,
	SimpleToast,
	Slider,
	Switch,
	Tab,
	UtilityButton,
	Box,
	Stack,
	Text,
	Paragraph,
	Heading,
	AutoSizedRowMasonry,
	theme,
	ThemeProvider,
	ImageWell,
} from '../index';
import { ShareDialog } from '../components/share-dialog';
import { GearIcon } from '../components/icons';
import { FloatUndock } from '../components/icons/18px';
import { colors } from '../components/shared-styles';
import { DocgenTable } from './docgen-table';
import { textInputPages } from './input/pages';
import { IconGroup } from './icon-table';
import { FavoriteFilled } from '../components/icons/18px';
import { ChevronDown } from '../components/icons/12px';

window.ResizeObserver = ResizeObserver;

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

const FormDemo = styled.form`
	display: inline-grid;
	grid-auto-flow: row;
	grid-row-gap: 12px;
`;

const ThemeList = ({ items, render }) => {
	return <>{[...Object.entries(items(theme))].map(render)}</>;
};

const pages = [
	{
		path: '/',
		title: 'Welcome',
		content: pageLoader(() => import('./WELCOME.md')),
		imports: { Paragraph, Button },
	},
	{
		title: 'Upgrading',
		path: '/upgrade-guide',
		content: pageLoader(() => import('../UpgradeGuide.md')),
	},
	{
		title: 'Theme',
		pages: [
			{
				path: '/theme/usage',
				title: 'Usage',
				content: pageLoader(() => import('./theme/usage.md')),
				imports: {
					Box,
					Stack,
					Text,
					Paragraph,
					Heading,
					ThemeList,
				},
			},
			{
				path: '/theme/customization',
				title: 'Customization',
				content: pageLoader(() => import('./theme/customization.md')),
			},
		],
	},
	{
		title: 'Layout Primitives',
		pages: [
			{
				path: '/layout/box',
				title: 'Box',
				content: pageLoader(() => import('./layout/box.md')),
				imports: {
					Box,
				},
			},
			{
				path: '/layout/stack',
				title: 'Stack',
				content: pageLoader(() => import('./layout/stack.md')),
				imports: {
					Box,
					Stack,
					Paragraph,
					Text,
				},
			},
			{
				path: '/layout/text',
				title: 'Text',
				content: pageLoader(() => import('./layout/Text.md')),
				imports: {
					Box,
					Stack,
					Text,
					Paragraph,
					Heading,
					ThemeList,
				},
			},
		],
	},
	{
		path: '/icons',
		title: 'Icons',
		content: pageLoader(() => import('./design-styles/icons.md')),
		imports: { IconGroup, FavoriteFilled, Box },
	},
	{
		path: '/row-masonry',
		title: 'Row Masonry',
		content: pageLoader(() => import('./row-masonry/documentation.md')),
		imports: {
			Box,
			AutoSizedRowMasonry,
		},
	},
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
					Checkbox,
					Form: FormDemo,
					Input,
					Switch,
				},
			},
			{
				path: '/accordion/documentation',
				title: 'Accordion Documentation',
				content: pageLoader(() => import('./accordion/documentation.md')),
				imports: { Accordion },
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
					Box,
					Button,
					MultiButton,
					SegmentedButtonGroup,
					ButtonDemo,
					ButtonGrid,
					ButtonSelect,
					GearIcon,
					buttonRef: React.createRef(),
				},
			},
			{
				path: '/button/utility-button',
				title: 'Utility Button',
				content: pageLoader(() => import('./button/utility-button.md')),
				imports: {
					UtilityButton,
					Box,
					Text,
				},
			},
			{
				path: '/button/ok-cancel',
				title: 'OK/Cancel Buttons',
				content: pageLoader(() => import('./button/ok-cancel.md')),
				imports: {
					Button,
					ButtonDemo,
				},
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
				imports: { Checkbox },
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
				imports: { Collapse },
			},
		],
	},
	{
		// TODO: fix use of v6 Popovers
		title: 'Date Picker',
		pages: [
			{
				path: '/date-picker/variations',
				title: 'Date Picker Variations',
				content: pageLoader(() => import('./date-picker/variations.md')),
				imports: {
					Button,
					Popover,
					DatePickerDemo: styled.div`
						font-family: Source Sans Pro;

						& button {
							font-family: Source Sans pro;
							font-size: 14px;
						}
					`,
					DatePicker,
					DatePeriodPicker,
					today: new Date(),
					dateFunctions: {
						...dateFunctions,
					},
					refs: new Array(4).fill(null).map(() => React.createRef()),
				},
			},
			{
				path: 'date-picker/documentation',
				title: 'Date Picker Documentation',
				content: pageLoader(() => import('./date-picker/documentation.md')),
				imports: { DatePicker, DatePeriodPicker },
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
				imports: { DatePickerInput },
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
				imports: { DropZone },
			},
		],
	},
	{
		title: 'Dropdown',
		pages: [
			{
				path: '/dropdown/variations',
				title: 'Dropdown Menu',
				content: pageLoader(() => import('./menu/dropdown.md')),
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
				},
			},
			{
				path: 'files-section/documentation',
				title: 'Files Section Documentation',
				content: pageLoader(() => import('./files-section/documentation.md')),
				imports: { FilesSection },
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
					Stack,
				},
			},
			{
				path: '/help-box/documentation',
				title: 'Help Box Documentation',
				content: pageLoader(() => import('./help-box/documentation.md')),
				imports: { HelpBox },
			},
		],
	},
	{
		title: 'ImageWell',
		pages: [
			{
				path: '/image-well',
				title: 'ImageWell',
				content: pageLoader(() => import('./image-well/documentation.md')),
				imports: {
					ImageWell,
					FavoriteFilled,
				},
			},
		],
	},
	textInputPages,
	{
		title: 'Listbox',
		pages: [
			{
				path: '/Listbox/variations',
				title: 'Listbox Variations',
				content: pageLoader(() => import('./listbox/variations.md')),
				imports: {
					Listbox,
					ListboxDemo: styled.div`
						display: flex;
						align-items: baseline;
					`,
					Button,
					browserList: ['Firefox', 'Chrome', 'Opera', 'Edge'],
					Label: styled.span`
						margin-right: 8px;
					`,
					ChevronDown,
				},
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
				imports: { LoadingSpinner },
			},
		],
	},
	{
		title: 'Menu',
		pages: [
			{
				path: '/menu/variations',
				title: 'Menu Variations',
				content: pageLoader(() => import('./menu/variations.md')),
				imports: {
					Menu,
					MenuDemo: styled.div`
						display: flex;
						align-items: flex-start;
						justify-content: space-between;
					`,
					Button,
					FavoriteFilled,
					avatarSrc:
						'https://files.logoscdn.com/v1/files/45929047/content.svg?signature=LanlyvDyHzxkch6f8DNUV1J15Lw',
					thumbnailSrc:
						'https://files.logoscdn.com/v1/files/46191785/assets/11156922/content.png?signature=ogDB6y5KmpyPWtBWitethsnveRw',
				},
			},
		],
	},
	{
		title: 'Modal',
		pages: [
			{
				path: '/modal',
				title: 'Modal Examples',
				content: pageLoader(() => import('./modal/variations.md')),
				imports: {
					Modal,
					Box,
					Input,
					Button,
					Menu,
				},
			},
			{
				path: '/modal/documentation',
				title: 'Modal Documentation',
				content: pageLoader(() => import('./modal/documentation.md')),
				imports: { Modal },
			},
		],
	},
	{
		// TODO: fix use of v6 Popovers
		title: 'Parameter Sentence',
		pages: [
			{
				path: '/parameter-sentence/variations',
				title: 'Parameter Sentence',
				content: pageLoader(() => import('./parameter-sentence/variations.md')),
				imports: {
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
					ParameterSentence,
				},
			},
			{
				path: '/parameter-sentence/command-sentence',
				title: 'Command Sentence',
				content: pageLoader(() => import('./parameter-sentence/command-sentence.md')),
			},
			{
				path: '/parameter-sentence/documentation',
				title: 'Parameter Sentence Documentation',
				content: pageLoader(() => import('./parameter-sentence/documentation.md')),
				imports: { ParameterSentence },
			},
		],
	},
	{
		title: 'Popover',
		pages: [
			{
				path: '/popover/variations',
				title: 'Popover Variations v6',
				content: pageLoader(() => import('./popover/variations.md')),
				imports: {
					Button,
					Popover,
					Tooltip,
					PopoverDemo: styled.div`
						display: flex;
						align-items: flex-start;
						justify-content: space-around;
					`,
					PopoverOverflowDemo: styled.div`
						display: flex;
						align-items: flex-start;
						justify-content: space-around;
						position: relative;
						overflow: hidden;
						padding-top: 20px;
					`,
					refs: new Array(10).fill(0).map(React.createRef),
				},
			},
			{
				path: '/popover/documentation',
				title: 'Popover Documentation',
				content: pageLoader(() => import('./popover/documentation.md')),
				imports: { Popover },
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
				imports: { Radio },
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
					Button,
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
				imports: { ShareDialog },
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
				imports: { SimpleToast },
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
				imports: { Slider },
			},
			{
				path: 'slider/documentation',
				title: 'Slider Documentation',
				content: pageLoader(() => import('./slider/documentation.md')),
				imports: { Slider },
			},
		],
	},
	{
		path: '/Switch/variations',
		title: 'Switch',
		content: pageLoader(() => import('./switch/variations.md')),
		imports: {
			Switch,
		},
	},
	{
		title: 'Tabs',
		pages: [
			{
				path: '/tabs/variations',
				title: 'Tabs Variations',
				content: pageLoader(() => import('./tabs/variations.md')),
				imports: {
					Paragraph,
					Tab,
					TabDemo: styled(Stack)`
						padding: 16px;
						background-color: white;
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
					Tab,
					SequencedTab,
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
				imports: { Tab, SequencedTab },
			},
		],
	},
];

function AcceptsStyledSystemProps() {
	return (
		<Checkbox disabled isChecked onClick={() => {}}>
			Accepts Styled-System props!
		</Checkbox>
	);
}

function AriaCompliant() {
	return (
		<Checkbox disabled isChecked onClick={() => {}}>
			WAI-ARIA compliant
		</Checkbox>
	);
}

function V6Banner({ children, oldHash }) {
	const v5BaseUrl = 'https://v5--faithlife-styled-ui.netlify.app/';
	return (
		<HelpBox variant="success" marginBottom={3}>
			<Stack spacing={3}>
				<Paragraph>
					This component has been updated for Styled-UI v6.
					<Button as="a" variant="link" href="/styled-ui/#/upgrade-guide" marginLeft={2}>
						View the full v6 upgrade guide
					</Button>
				</Paragraph>
				{children}

				<Button
					as="a"
					variant="secondary"
					href={`${v5BaseUrl}${oldHash ?? document.location.hash}`}
					target="_blank"
					icon={<FloatUndock color="currentColor" />}
				>
					View the v5 docs
				</Button>
			</Stack>
		</HelpBox>
	);
}

const commonImports = {
	DocgenTable,
	AcceptsStyledSystemProps,
	AriaCompliant,
	HelpBox,
	V6Banner,
	ThemeProvider,
};

ReactDOM.render(
	<Catalog
		title="Catalog"
		imports={commonImports}
		pages={pages}
		logoSrc="faithlife-logo.svg"
		theme={{
			fontFamily: 'Roboto',
			pageHeadingBackground: colors.flGray,
		}}
	/>,
	document.getElementById('catalog'),
);

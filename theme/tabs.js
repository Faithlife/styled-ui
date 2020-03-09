import { textStyles } from './textStyles';

const tabs = {
	modal: {
		...textStyles.ui['16'],
		color: 'tab.modalForeground',
		border: 1,
		paddingX: 5,
		paddingY: [4, 3],
		'&:hover': {
			backgroundColor: 'tab.modalHover',
			borderColor: 'tab.modalHover',
		},
		'&:active': {
			backgroundColor: 'tab.modalActive',
			borderColor: 'tab.modalActive',
		},
		'&:disabled': {
			color: 'tab.modalForegroundDisabled',
			backgroundColor: 'tab.modalDisabled',
			borderColor: 'tab.modalDisabled',
		},
		'&::before': {
			content: '',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '3px',
			backgroundColor: 'tab.modalColorStripeActive',
			border: 1,
			borderColor: 'tab.modalColorStripeActive',
			borderRadius: 1,
		},
		'$::after': {
			content: '',
			position: 'absolute',
			top: '100%',
			left: '1px',
			width: 'calc(100% - 2px)',
			height: '1px',
			backgroundColor: 'tab.modalBackgroundActive',
		},
	},
	page: {
		...textStyles.ui['16'],
		color: 'tab.pageForeground',
		backgroundColor: 'tab.pageBackground',
		paddingX: 5,
		paddingBottom: 5,
		paddingTop: 18,
		width: '100%',
		maxWidth: ['73px', '194px'],
		'&::after': {
			content: '""',
			width: '100%',
			height: '4px',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'tab.pageColorStripe',
		},
	},
};

const tabLists = {
	modal: {
		border: 1,
		borderBottomColor: 'tab.modalBorderColor',
		gridAutoColumns: 'auto',
	},
	page: {
		'&>*:not(:last-child)': {
			marginRight: 2,
		},
	},
};

const selected = {
	'modal-false': {},
	'modal-true': {
		backgroundColor: 'tab.modalBackgroundActive',
		borderColor: 'tab.borderColor',
	},
	'page-false': {},
	'page-true': {
		color: 'tab.pageForegroundActive',
		backgroundColor: 'tab.pageBackgroundActive',
		fontWeight: 1,
		'&::after': {
			backgroundColor: 'tab.pageColorStripeActive',
		},
	},
};

const buttonSizes = {
	small: {
		...textStyles.ui['16'],
		height: '32px',
		paddingX: '6px', // we want a square button with an 18x18 icon
		borderRadius: 1,
	},
	medium: {
		...textStyles.ui['16'],
		height: '40px',
		paddingX: '10px', // we want a square button with an 18x18 icon
		borderRadius: 1,
	},
	large: {
		...textStyles.ui['24'],
		height: '48px',
		paddingX: '11px', // we want a square button with a 24x24 icon
		borderRadius: 2,
	},
};

export { tabs, tabLists, selected };

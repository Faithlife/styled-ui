import { textStyles } from './textStyles';

const tabs = {
	modal: {
		...textStyles.ui['16'],
		color: 'tab.modalForeground',
		borderRadius: '3px 3px 0 0',
		paddingX: 5,
		paddingY: [4, 3],
		backgroundColor: 'tab.modalBackground',
		marginBottom: '-1px',
		borderBottom: 1,
		borderBottomColor: 'tab.modalBorder',
		'&:hover': {
			backgroundColor: 'tab.modalHover',
		},
		'&:disabled': {
			color: 'tab.modalForegroundDisabled',
			backgroundColor: 'tab.modalDisabled',
		},
		'&:active': {
			backgroundColor: 'tab.modalActive',
			borderColor: 'tab.modalActive',
		},
		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '3px',
			backgroundColor: 'tab.modalColorStripe',
			border: 1,
			borderColor: 'tab.modalColorStripe',
			borderRadius: 1,
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
		'&:disabled': {
			color: 'tab.pageForegroundDisabled',
		},
		'&:hover': {
			backgroundColor: 'tab.pageHover',
		},
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
		borderBottom: 1,
		borderColor: 'tab.modalBorder',
		'&>*:not(:last-child)': {
			marginRight: 2,
		},
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
		'&::before': {
			content: '""',
			boxSizing: 'border-box',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '4px',
			backgroundColor: 'tab.modalColorStripeActive',
			borderLeft: 1,
			borderRight: 1,
			borderColor: 'tab.modalColorStripeActive',
			borderRadius: '3px 3px 0 0',
		},
		backgroundColor: 'tab.modalBackgroundActive',
		borderLeft: 1,
		borderRight: 1,
		borderLeftColor: 'tab.modalBorder',
		borderRightColor: 'tab.modalBorder',
		borderBottom: 1,
		borderBottomColor: 'tab.modalBackgroundActive',
		fontWeight: 1,
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

export { tabs, tabLists, selected };

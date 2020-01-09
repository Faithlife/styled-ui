import { textStyles } from './textStyles';

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

const buttons = {
	primary: {
		color: 'button.primaryForeground',
		backgroundColor: 'button.primaryBackground',
		border: 1,
		borderColor: 'button.primaryBackground',
		'&:hover': {
			backgroundColor: 'button.primaryHover',
			borderColor: 'button.primaryHover',
		},
		'&:active': {
			backgroundColor: 'button.primaryActive',
			borderColor: 'button.primaryActive',
		},
		'&:disabled': {
			color: 'button.primaryForegroundDisabled',
			backgroundColor: 'button.primaryDisabled',
			borderColor: 'button.primaryDisabled',
		},
	},
	secondary: {
		border: 1,
		color: 'button.primaryBackground',
		backgroundColor: 'button.primaryForeground',
		borderColor: 'button.primaryBackground',
		'&:hover': {
			color: 'button.primaryForeground',
			backgroundColor: 'button.primaryBackground',
		},
		'&:active': {
			color: 'button.primaryForeground',
			backgroundColor: 'button.primaryActive',
			borderColor: 'button.primaryActive',
		},
		'&:disabled': {
			color: 'button.primaryDisabled',
			borderColor: 'button.primaryDisabled',
			backgroundColor: 'button.primaryForeground',
		},
	},
	minor: {
		border: 1,
		color: 'button.minorForeground',
		backgroundColor: 'button.minorBackground',
		borderColor: 'button.minorBackground',
		'&:hover': {
			backgroundColor: 'button.minorHover',
			borderColor: 'button.minorHover',
		},
		'&:active': {
			backgroundColor: 'button.minorActive',
			borderColor: 'button.minorActive',
		},
		'&:disabled': {
			color: 'button.minorForegroundDisabled',
			backgroundColor: 'button.minorDisabled',
			borderColor: 'button.minorDisabled',
		},
	},
	transparent: {
		border: 1,
		color: 'button.minorForeground',
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		'&:hover': {
			backgroundColor: 'button.transparentHover',
			borderColor: 'button.transparentHover',
		},
		'&:active,&.active': {
			backgroundColor: 'button.primaryDisabled',
			borderColor: 'button.primaryDisabled',
			color: 'button.primaryActive',
		},
		'&:disabled': {
			color: 'button.minorForegroundDisabled',
			backgroundColor: 'transparent',
		},
	},
	link: {
		border: 1,
		color: 'button.primaryBackground',
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		'&:hover': {
			color: 'button.primaryHover',
		},
		'&:active': {
			color: 'button.primaryActive',
		},
		'&:disabled': {
			color: 'button.primaryDisabled',
		},
	},
	danger: {
		border: 1,
		color: 'button.dangerBackground',
		backgroundColor: 'button.dangerForeground',
		borderColor: 'button.dangerBackground',
		'&:hover': {
			color: 'button.dangerForeground',
			backgroundColor: 'button.dangerBackground',
			borderColor: 'button.dangerBackground',
		},
		'&:active': {
			backgroundColor: 'button.dangerActive',
			borderColor: 'button.dangerActive',
		},
		'&:disabled': {
			color: 'button.dangerDisabled',
			backgroundColor: 'button.dangerForeground',
			borderColor: 'button.dangerDisabled',
		},
	},
	dangerSpecial: {
		border: 1,
		color: 'button.dangerForeground',
		backgroundColor: 'button.dangerBackground',
		borderColor: 'button.dangerBackground',
		'&:hover': {
			backgroundColor: 'button.dangerHover',
			borderColor: 'button.dangerHover',
		},
		'&:active': {
			backgroundColor: 'button.dangerActive',
			borderColor: 'button.dangerActive',
		},
		'&:disabled': {
			color: 'button.dangerForegroundDisabled',
			backgroundColor: 'button.dangerDisabled',
			borderColor: 'button.dangerDisabled',
		},
	},
};

export { buttonSizes, buttons };

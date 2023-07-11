export const theme = {
	scrollbars: {
		width: '8px',
		background: '#46444F',
		thumbBackground: 'rgba(120, 120, 120, 0.8)',
	},
	colors: {
		foregroundPrimary: 'white',
		backgroundPrimary: '#2e2d39',
		input: {
			foreground: '#FFFFFF',
			border: '#111111',
			borderFocused: '#4F7EDF',
			shadowFocused: 'transparent',
			placeholderForeground: '#7a7a7a',
			background: '#17151F',
			backgroundReadOnly: '#17151F',
			icon: '#a8a8a8',
			iconFocused: '#a8a8a8',
		},
		accordion: {
			sectionHeaderTitle: 'foregroundPrimary',
			sectionHeaderSubtitle: 'gray66',
			sectionBorder: '#2e2d39',
		},
		popover: {
			foreground: 'white',
			background: '#2e2d39',
		},
		button: {
			focusBorder: 'transparent',
			focusShadow: '#7ccaff',

			primaryForeground: 'foregroundPrimary',
			primaryBackground: '#4F7EDF',

			segmentedButtonGroupBorder: '#46444F',
			segmentedButtonGroupBackground: '#7a7a7a',

			multi: {
				border: '#46444F',
				selectedBackground: '#323232',
				selectedForeground: 'foregroundPrimary',
			},
		},
		select: {
			menuBackground: '#46444F',
			menuForeground: 'foregroundPrimary',
			menuItemFocusedBackground: '#2e2d39',
		},
		dropdown: {
			background: '#46444F',
			backgroundHover: '#2e2d39',
			foreground: 'foregroundPrimary',
			separator: '#999999',
			foregroundDisabled: '#999999',
		},
		checkbox: {
			background: 'transparent',
			primary: '#4F7EDF',
			border: 'foregroundPrimary',
			disabledBackground: 'transparent',
			disabledBorder: '#999999',
		},
	},
	buttons: {
		primary: {
			color: 'button.primaryForeground',
			backgroundColor: '#4F7EDF',
			border: 1,
			borderColor: '#4F7EDF',
			'&:hover': {
				backgroundColor: '#008ae9',
				borderColor: '#008ae9',
			},
			'&:active': {
				backgroundColor: '#007ace',
				borderColor: '#007ace',
			},
			'&:disabled': {
				color: '#999999',
				backgroundColor: '#666666',
				borderColor: '#666666',
			},
		},
		secondary: {
			border: 1,
			color: '#ebebeb',
			backgroundColor: 'transparent',
			borderColor: '#999999',
			'&:hover': {
				color: 'foregroundPrimary',
				borderColor: 'foregroundPrimary',
			},
			'&:active': {
				color: 'foregroundPrimary',
				backgroundColor: '#323232',
				borderColor: '#323232',
			},
			'&:disabled': {
				color: '#999999',
				borderColor: '#767676',
				backgroundColor: 'transparent',
			},
		},
		minor: {
			border: 1,
			color: 'foregroundPrimary',
			backgroundColor: '#767676',
			borderColor: '#767676',
			'&:hover': {
				backgroundColor: '#666666',
				borderColor: '#666666',
			},
			'&:active': {
				backgroundColor: '#323232',
				borderColor: '#323232',
			},
			'&:disabled': {
				color: '#999999',
				backgroundColor: '#666666',
				borderColor: '#666666',
			},
		},
		transparent: {
			border: 1,
			color: 'foregroundPrimary',
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			'&:hover': {
				backgroundColor: '#666666',
				borderColor: '#666666',
			},
			'&:active,&.active': {
				backgroundColor: '#323232',
				borderColor: '#323232',
			},
			'&:disabled': {
				color: '#999999',
			},
		},
		minorTransparent: {
			color: 'foregroundPrimary',
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			'&:hover': {
				color: '#4F7EDF',
			},
			'&:active,&.active': {
				color: '#ffec1f',
			},
			'&:disabled': {
				color: '#999999',
			},
		},
		link: {
			border: 1,
			color: '#4F7EDF',
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			'&:hover': {
				color: '#ffec1f',
			},
			'&:active': {
				color: '#ffec1f',
			},
			'&:disabled': {
				color: '#999999',
			},
		},
		danger: {
			border: 1,
			color: '#d94848',
			backgroundColor: 'transparent',
			borderColor: '#d94848',
			'&:hover': {
				color: 'foregroundPrimary',
				backgroundColor: '#cd3838',
				borderColor: '#cd3838',
			},
			'&:active': {
				color: 'foregroundPrimary',
				backgroundColor: '#b12727',
				borderColor: '#b12727',
			},
			'&:disabled': {
				color: '#999999',
				borderColor: '#767676',
				backgroundColor: 'transparent',
			},
		},
		dangerSpecial: {
			border: 1,
			color: 'foregroundPrimary',
			backgroundColor: '#e85252',
			borderColor: '#e85252',
			'&:hover': {
				color: 'foregroundPrimary',
				backgroundColor: '#cd3838',
				borderColor: '#cd3838',
			},
			'&:active': {
				color: 'foregroundPrimary',
				backgroundColor: '#b12727',
				borderColor: '#b12727',
			},
			'&:disabled': {
				color: '#999999',
				borderColor: '#666666',
				backgroundColor: '#666666',
			},
		},
	},
};

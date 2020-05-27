export const theme = {
	scrollbars: {
		width: '8px',
		background: '#494949',
		thumbBackground: 'rgba(120, 120, 120, 0.8)',
	},
	colors: {
		foregroundPrimary: 'white',
		backgroundPrimary: '#2e2e2e',
		input: {
			foreground: '#FFFFFF',
			border: '#111111',
			borderFocused: '#0097FF',
			shadowFocused: 'transparent',
			placeholderForeground: '#7a7a7a',
			background: '#252525',
			backgroundReadOnly: '#252525',
			icon: '#a8a8a8',
			iconFocused: '#a8a8a8',
		},
		accordion: {
			sectionHeaderTitle: 'foregroundPrimary',
			sectionHeaderSubtitle: 'gray66',
			sectionBorder: '#2e2e2e',
		},
		popover: {
			foreground: 'white',
			background: '#2e2e2e',
		},
		button: {
			focusBorder: 'transparent',
			focusShadow: '#7ccaff',

			primaryForeground: 'foregroundPrimary',
			primaryBackground: '#0097FF',

			segmentedButtonGroupBorder: '#494949',
			segmentedButtonGroupBackground: '#7a7a7a',
		},
		select: {
			menuBackground: '#494949',
			menuForeground: 'foregroundPrimary',
			menuItemFocusedBackground: '#2e2e2e',
		},
		dropdown: {
			background: '#494949',
			backgroundHover: '#2e2e2e',
			foreground: 'foregroundPrimary',
			separator: '#999999',
			foregroundDisabled: '#999999',
		},

		checkbox: {
			background: 'transparent',
			primary: '#0097FF',
			border: 'foregroundPrimary',
			disabledBackground: 'transparent',
			disabledBorder: '#999999',
		},
	},
	buttons: {
		primary: {
			color: 'button.primaryForeground',
			backgroundColor: '#0097FF',
			border: 1,
			borderColor: '#0097FF',
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
				color: '#0097ff',
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
			color: '#0097ff',
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

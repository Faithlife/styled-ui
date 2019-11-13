import React, { useState, useEffect } from 'react';
import ReactSelect, {
	Creatable as ReactSelectCreatable,
	components as reactSelectComponents,
} from 'react-select';
import { colors } from '../shared-styles';
import { ChevronExpand } from '../icons';
import { ReactSelectAsyncCreatable, ReactSelectAsync } from './react-select-async';
import { theme } from '../../theme';

const selectStyles = props => {
	const ourStyles = {
		control: (styles, state) => ({
			...styles,
			minHeight: '32px',
			fontSize: '16px',
			border: state.isFocused
				? `1px solid ${theme.colors.inputFocusedBorderColor}`
				: `1px solid ${theme.colors.inputBorderColor}`,
			boxShadow: state.isFocused ? `0 0 0 2px ${theme.colors.inputFocusedShadowColor}` : 'none',
		}),
		valueContainer: styles => ({
			...styles,
			padding: '0 6px',
		}),
		input: styles => ({
			...styles,
			lineHeight: 1,
			input: {
				'&,&:focus': {
					boxShadow: 'none',
				},
			},
		}),
		indicatorSeparator: () => ({
			display: 'none',
		}),
		clearIndicator: () => ({
			display: 'none',
		}),
		dropdownIndicator: styles => ({
			...styles,
			fill: colors.gray52,
			padding: '5px 8px',
		}),
		placeholder: styles => ({
			...styles,
			lineHeight: 1,
			whiteSpace: 'nowrap',
			color: `${theme.colors.inputPlaceholderColor}`,
		}),
		singleValue: styles => ({
			...styles,
			color: props.inferred ? '#006099' : colors.gray66,
		}),
		multiValue: styles => ({
			...styles,
			backgroundColor: colors.gray4,
		}),
		multiValueLabel: styles => ({
			...styles,
			color: colors.gray66,
		}),
		multiValueRemove: styles => ({
			...styles,
			color: colors.gray52,
			':hover': {
				backgroundColor: '',
				color: colors.blueDark,
			},
		}),
		menuPortal: styles => ({
			...styles,
			zIndex: 1100,
		}),
		menu: styles => ({
			...styles,
			marginTop: 0,
			boxShadow: 'rgba(0, 0, 0, 0.24) 0px 4px 4px 0px, rgba(0, 0, 0, 0.24) 0px 0px 4px 0px;',
		}),
	};

	const customStyles = props.styles;
	if (!customStyles) {
		return ourStyles;
	}

	const ourWrappedStyles = Object.entries(ourStyles).reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]: (styles, state) => {
				const ourStyle = value(styles, state);
				if (props.styles[key]) {
					// pass the resulting style object from our style functions to the custom style functions
					return props.styles[key](ourStyle, state);
				}

				return ourStyle;
			},
		}),
		{},
	);

	return { ...customStyles, ...ourWrappedStyles };
};

const selectTheme = theme => ({
	...theme,
	colors: {
		...theme.colors,
		primary: colors.blueBase,
		primary25: colors.gray8,
		primary50: colors.gray8,
		primary75: colors.gray8,
		danger: colors.redBase,
		dangerLight: colors.redLight,
	},
});

const defaultComponents = {
	// eslint-disable-next-line react/prop-types
	Option: ({ children, ...props }) => (
		<reactSelectComponents.Option {...props}>{children || '\u200B'}</reactSelectComponents.Option>
	),
};

const DropdownIndicator = props => {
	return (
		<reactSelectComponents.DropdownIndicator {...props}>
			<ChevronExpand />
		</reactSelectComponents.DropdownIndicator>
	);
};

function noOptionsMessage({ inputValue }) {
	return inputValue ? 'No options' : null;
}

/** Autocomplete control based on react-select */
export const Select = React.forwardRef(({ components = {}, ...props }, ref) => {
	const body = useBody();

	return (
		<ReactSelect
			ref={ref}
			classNamePrefix="fl-select"
			theme={selectTheme}
			components={{ DropdownIndicator, ...defaultComponents, ...components }}
			noOptionsMessage={noOptionsMessage}
			menuPortalTarget={body}
			{...props}
			styles={selectStyles(props)}
		/>
	);
});

/** The same as `Select`, but allows new entries. */
export const CreatableSelect = React.forwardRef(({ components = {}, ...props }, ref) => {
	const body = useBody();

	return (
		<ReactSelectCreatable
			ref={ref}
			classNamePrefix="fl-select"
			theme={selectTheme}
			formatCreateLabel={node => <span>New entry: {node}</span>}
			components={{ DropdownIndicator, ...defaultComponents, ...components }}
			noOptionsMessage={noOptionsMessage}
			menuPortalTarget={body}
			{...props}
			styles={selectStyles(props)}
		/>
	);
});

/** The same as `Select`, but allows new entries and fetches data asynchronously. */
export const AsyncCreatableSelect = React.forwardRef(({ components = {}, ...props }, ref) => {
	const body = useBody();

	return (
		<ReactSelectAsyncCreatable
			ref={ref}
			allowCreateWhileLoading={false}
			classNamePrefix="fl-select"
			theme={selectTheme}
			components={{ DropdownIndicator, ...defaultComponents, ...components }}
			formatCreateLabel={node => <span>New entry: {node}</span>}
			noOptionsMessage={noOptionsMessage}
			menuPortalTarget={body}
			{...props}
			styles={selectStyles(props)}
		/>
	);
});

/** The same as `Select`, but fetches options asynchronously. */
export const AsyncSelect = React.forwardRef(({ components = {}, ...props }, ref) => {
	const body = useBody();

	return (
		<ReactSelectAsync
			ref={ref}
			classNamePrefix="fl-select"
			theme={selectTheme}
			components={{ DropdownIndicator, ...defaultComponents, ...components }}
			noOptionsMessage={noOptionsMessage}
			menuPortalTarget={body}
			{...props}
			styles={selectStyles(props)}
		/>
	);
});

function useBody() {
	const [body, setBody] = useState(null);
	useEffect(() => {
		setBody((window && window.document.body) || null);
	}, []);

	return body;
}

import React from 'react';
import ReactSelect, {
	Creatable as ReactSelectCreatable,
	components as reactSelectComponents,
} from 'react-select';
import { colors, inputColors } from '../shared-styles';
import { ReactSelectAsyncCreatable, ReactSelectAsync } from './react-select-async';

const selectStyles = props => {
	const ourStyles = {
		control: (styles, state) => ({
			...styles,
			minHeight: '30px',
			fontSize: '16px',
			border: state.isFocused
				? `1px solid ${inputColors.inputFocusedBorderColor}`
				: `1px solid ${inputColors.inputBorderColor}`,
			boxShadow: state.isFocused ? `0 0 0 2px ${inputColors.inputFocusedShadowColor}` : 'none',
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
			padding: '5px 8px',
		}),
		placeholder: styles => ({
			...styles,
			lineHeight: 1,
			whiteSpace: 'nowrap',
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
		menu: styles => ({
			...styles,
			zIndex: 100,
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

function noOptionsMessage({ inputValue }) {
	return inputValue ? 'No options' : null;
}

/** Autocomplete control based on react-select */
export const Select = React.forwardRef(({ components = {}, ...props }, ref) => (
	<ReactSelect
		ref={ref}
		classNamePrefix="fl-select"
		theme={selectTheme}
		components={{ ...defaultComponents, ...components }}
		noOptionsMessage={noOptionsMessage}
		{...props}
		styles={selectStyles(props)}
	/>
));

/** The same as `Select`, but allows new entries. */
export const CreatableSelect = React.forwardRef(({ components = {}, ...props }, ref) => (
	<ReactSelectCreatable
		ref={ref}
		classNamePrefix="fl-select"
		theme={selectTheme}
		formatCreateLabel={node => <span>New entry: {node}</span>}
		components={{ ...defaultComponents, ...components }}
		noOptionsMessage={noOptionsMessage}
		{...props}
		styles={selectStyles(props)}
	/>
));

/** The same as `Select`, but allows new entries and fetches data asynchronously. */
export const AsyncCreatableSelect = React.forwardRef(({ components = {}, ...props }, ref) => (
	<ReactSelectAsyncCreatable
		ref={ref}
		allowCreateWhileLoading={false}
		classNamePrefix="fl-select"
		theme={selectTheme}
		components={{ ...defaultComponents, ...components }}
		formatCreateLabel={node => <span>New entry: {node}</span>}
		noOptionsMessage={noOptionsMessage}
		{...props}
		styles={selectStyles(props)}
	/>
));

/** The same as `Select`, but fetches options asynchronously. */
export const AsyncSelect = React.forwardRef(({ components = {}, ...props }, ref) => (
	<ReactSelectAsync
		ref={ref}
		classNamePrefix="fl-select"
		theme={selectTheme}
		components={{ ...defaultComponents, ...components }}
		noOptionsMessage={noOptionsMessage}
		{...props}
		styles={selectStyles(props)}
	/>
));

import React from 'react';
import ReactSelect from 'react-select';
import ReactSelectCreatable from 'react-select/lib/Creatable';
import { colors, inputColors } from '../shared-styles';
import { ReactSelectAsyncCreatable, ReactSelectAsync } from './react-select-async';

const selectStyles = props => ({
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
});

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

/** Autocomplete control based on react-select */
export const Select = React.forwardRef((props, ref) => (
	<ReactSelect
		ref={ref}
		styles={selectStyles(props)}
		classNamePrefix="fl-select"
		theme={selectTheme}
		{...props}
	/>
));

/** The same as `Select`, but allows new entries. */
export const CreatableSelect = props => (
	<ReactSelectCreatable
		styles={selectStyles(props)}
		classNamePrefix="fl-select"
		theme={selectTheme}
		formatCreateLabel={node => <span>New entry: {node}</span>}
		{...props}
	/>
);

/** The same as `Select`, but allows new entries and fetches data asynchronously. */
export const AsyncCreatableSelect = props => (
	<ReactSelectAsyncCreatable
		allowCreateWhileLoading={false}
		styles={selectStyles(props)}
		classNamePrefix="fl-select"
		theme={selectTheme}
		formatCreateLabel={node => <span>New entry: {node}</span>}
		{...props}
	/>
);

/** The same as `Select`, but fetches options asynchronously. */
export const AsyncSelect = props => (
	<ReactSelectAsync
		styles={selectStyles(props)}
		classNamePrefix="fl-select"
		theme={selectTheme}
		{...props}
	/>
);

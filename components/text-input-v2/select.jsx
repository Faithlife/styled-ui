import React from 'react';
import ReactSelect from 'react-select';
import ReactSelectAsync from 'react-select/lib/Async';
import ReactSelectCreatable from 'react-select/lib/Creatable';
import ReactSelectAsyncCreatable from 'react-select/lib/AsyncCreatable';
import { colors } from '../shared-styles';

const selectStyles = {
	control: styles => ({
		...styles,
		minHeight: '30px',
		fontSize: '16px',
	}),
	valueContainer: styles => ({
		...styles,
		padding: '0 8px',
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
	multiValue: styles => ({
		...styles,
		backgroundColor: colors.blueTint,
	}),
	multiValueLabel: styles => ({
		...styles,
		color: colors.blueDark,
	}),
};

const selectTheme = theme => ({
	...theme,
	colors: {
		...theme.colors,
		primary: colors.blueDark,
		primary25: colors.gray8,
		primary50: colors.blueTint,
		primary75: colors.blueTint,
		danger: colors.redBase,
		dangerLight: colors.redLight,
	},
});

/** Autocomplete control based on react-select */
export const Select = props => (
	<ReactSelect styles={selectStyles} classNamePrefix="fl-select" theme={selectTheme} {...props} />
);

/** The same as `Select`, but allows new entries. */
export const CreatableSelect = props => (
	<ReactSelectCreatable
		styles={selectStyles}
		classNamePrefix="fl-select"
		theme={selectTheme}
		formatCreateLabel={node => <span>New entry: {node}</span>}
		{...props}
	/>
);

/** The same as `Select`, but allows new entries and fetches data asynchronously. */
export const AsyncCreatableSelect = props => (
	<ReactSelectAsyncCreatable
		styles={selectStyles}
		classNamePrefix="fl-select"
		theme={selectTheme}
		formatCreateLabel={node => <span>New entry: {node}</span>}
		{...props}
	/>
);

/** The same as `Select`, but fetches options asynchronously. */
export const AsyncSelect = props => (
	<ReactSelectAsync
		styles={selectStyles}
		classNamePrefix="fl-select"
		theme={selectTheme}
		{...props}
	/>
);

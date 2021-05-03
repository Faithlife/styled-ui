import React, { useState, useEffect, useCallback } from 'react';
import ReactSelect, { components as reactSelectComponents } from 'react-select';
import ReactSelectCreatable from 'react-select/creatable';
import { colors } from '../shared-styles';
import { ChevronDown } from '../icons/12px';
import { Checkbox } from '../../components/check-box';
import { DebouncedSelectAsync, DebouncedSelectAsyncCreatable } from './debounced-async';
import * as Styled from './styled';
import { ThemedBox } from '../ThemedBox';
import { useTheme } from '../../theme';

const selectStyles = (props, theme) => {
	const ourStyles = {
		control: (styles, state) => ({
			...styles,
			minHeight: '32px',
			fontSize: '16px',
			backgroundColor: theme.colors.input.background,
			color: theme.colors.input.foreground,
			border: state.isFocused
				? `1px solid ${theme.colors.input.borderFocused}`
				: `1px solid ${theme.colors.input.border}`,
			borderRadius: theme.radii[1],
			boxShadow: state.isFocused ? `0 0 0 2px ${theme.colors.input.shadowFocused}` : 'none',
			'&:hover': {
				borderColor: state.isFocused ? theme.colors.input.borderFocused : theme.colors.input.border,
			},
		}),
		valueContainer: styles => ({
			...styles,
			padding: '0 6px',
			input: {
				fontFamily: 'inherit',
			},
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
			color: theme.colors.input.icon,
			padding: '5px 8px',
		}),
		placeholder: styles => ({
			...styles,
			lineHeight: 1,
			whiteSpace: 'nowrap',
			color: theme.colors.input.placeholderForeground,
		}),
		singleValue: styles => ({
			...styles,
			color: props.inferred ? '#006099' : theme.colors.input.foreground,
		}),
		multiValue: styles => ({
			...styles,
			backgroundColor: colors.gray4,
		}),
		multiValueLabel: styles => ({
			...styles,
			color: theme.colors.input.foreground,
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
			boxShadow: theme.shadows[1],
			backgroundColor: theme.colors.select.menuBackground,
			color: theme.colors.select.menuForeground,
		}),
		option: (styles, state) => ({
			...styles,
			backgroundColor: state.isFocused
				? theme.colors.select.menuItemFocusedBackground
				: theme.colors.select.menuBackground,
			color: theme.colors.select.menuForeground,
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

	DropdownIndicator: props => (
		<reactSelectComponents.DropdownIndicator {...props}>
			<ChevronDown color="currentColor" />
		</reactSelectComponents.DropdownIndicator>
	),

	Menu: props => (
		<ThemedBox>
			<reactSelectComponents.Menu {...props} />
		</ThemedBox>
	),
};

const AvatarOption = ({ data, selectProps: { showCheckboxes, getIsOptionChecked }, ...props }) => {
	const theme = useTheme();
	const { avatar, label, secondaryLabel } = data;

	// Using styled instead of theme for theme prop since react-select already uses a prop named theme and there is a collision.
	return (
		<Styled.AvatarOption {...props} styled={theme}>
			{avatar ? (
				<>
					{!showCheckboxes ? null : (
						<Styled.AvatarOptionCheckbox theme={theme}>
							<Checkbox onClick={() => {}} isChecked={getIsOptionChecked(data)} disableAutoBlur />
						</Styled.AvatarOptionCheckbox>
					)}
					<Styled.AvatarOptionImage src={avatar} alt={label} />
					<Styled.AvatarOptionText theme={theme}>
						<Styled.AvatarOptionName theme={theme}>{label}</Styled.AvatarOptionName>
						{secondaryLabel && (
							<Styled.AvatarOptionSecondaryLabel theme={theme}>
								{secondaryLabel}
							</Styled.AvatarOptionSecondaryLabel>
						)}
					</Styled.AvatarOptionText>
				</>
			) : (
				label
			)}
		</Styled.AvatarOption>
	);
};

const AvatarMultiValue = ({ data: { avatar, label }, ...props }) => {
	const theme = useTheme();

	return (
		<Styled.AvatarMultiValue {...props}>
			{avatar ? (
				<>
					<Styled.AvatarMultiValueImage src={avatar} alt={label} />
					<Styled.AvatarMultiValueName theme={theme}>{label}</Styled.AvatarMultiValueName>
				</>
			) : (
				label
			)}
		</Styled.AvatarMultiValue>
	);
};

export const avatarComponents = {
	...defaultComponents,
	Option: AvatarOption,
	MultiValue: AvatarMultiValue,
};

function noOptionsMessage({ inputValue }) {
	return inputValue ? 'No options' : null;
}

function handleKeyDown(e, onConsumerKeyDown) {
	const { nodeName, type, value } = e.target;
	if (onConsumerKeyDown) {
		onConsumerKeyDown(e);
		if (e.defaultPrevented) {
			return;
		}
	}

	if (nodeName.toLowerCase() === 'input' && type.toLowerCase() === 'text') {
		const selectionIndex = e.key === 'Home' ? 0 : e.key === 'End' ? value.length : null;

		if (selectionIndex !== null) {
			if (e.shiftKey) {
				if (e.key === 'Home') {
					e.target.selectionStart = selectionIndex;
				} else {
					e.target.selectionEnd = selectionIndex;
				}
			} else {
				e.target.setSelectionRange(selectionIndex, selectionIndex);
			}
		}
	}
}

export { reactSelectComponents };

/** Autocomplete control based on react-select */
export const Select = React.forwardRef(
	({ components = {}, disabled, isDisabled, isClearable = true, ...props }, ref) => {
		const body = useBody();
		const onConsumerKeyDown = props.onKeyDown;

		const onChange = useLegacyChangeHandler(props.onChange, props.isMulti);
		const theme = useTheme();

		return (
			<ReactSelect
				ref={ref}
				classNamePrefix="fl-select"
				theme={selectTheme}
				components={{ ...defaultComponents, ...components }}
				noOptionsMessage={noOptionsMessage}
				menuPortalTarget={body}
				isDisabled={disabled || isDisabled}
				isClearable={isClearable}
				{...props}
				onChange={onChange}
				styles={selectStyles(props, theme)}
				onKeyDown={e => handleKeyDown(e, onConsumerKeyDown)}
			/>
		);
	},
);

/** The same as `Select`, but allows new entries. */
export const CreatableSelect = React.forwardRef(
	({ components = {}, disabled, isDisabled, isClearable = true, ...props }, ref) => {
		const body = useBody();
		const onConsumerKeyDown = props.onKeyDown;

		const onChange = useLegacyChangeHandler(props.onChange, props.isMulti);
		const theme = useTheme();

		return (
			<ReactSelectCreatable
				ref={ref}
				classNamePrefix="fl-select"
				theme={selectTheme}
				formatCreateLabel={node => <span>New entry: {node}</span>}
				components={{ ...defaultComponents, ...components }}
				noOptionsMessage={noOptionsMessage}
				menuPortalTarget={body}
				isDisabled={disabled || isDisabled}
				isClearable={isClearable}
				{...props}
				onChange={onChange}
				styles={selectStyles(props, theme)}
				onKeyDown={e => handleKeyDown(e, onConsumerKeyDown)}
			/>
		);
	},
);

/** The same as `Select`, but allows new entries and fetches data asynchronously. */
export const AsyncCreatableSelect = React.forwardRef(
	({ components = {}, disabled, isDisabled, isClearable = true, ...props }, ref) => {
		const body = useBody();
		const onConsumerKeyDown = props.onKeyDown;

		const onChange = useLegacyChangeHandler(props.onChange, props.isMulti);
		const theme = useTheme();

		return (
			<DebouncedSelectAsyncCreatable
				ref={ref}
				allowCreateWhileLoading={false}
				classNamePrefix="fl-select"
				theme={selectTheme}
				components={{ ...defaultComponents, ...components }}
				formatCreateLabel={node => <span>New entry: {node}</span>}
				noOptionsMessage={noOptionsMessage}
				menuPortalTarget={body}
				isDisabled={disabled || isDisabled}
				isClearable={isClearable}
				{...props}
				onChange={onChange}
				styles={selectStyles(props, theme)}
				onKeyDown={e => handleKeyDown(e, onConsumerKeyDown)}
			/>
		);
	},
);

/** The same as `Select`, but fetches options asynchronously. */
export const AsyncSelect = React.forwardRef(
	({ components = {}, disabled, isDisabled, isClearable = true, ...props }, ref) => {
		const body = useBody();
		const onConsumerKeyDown = props.onKeyDown;

		const onChange = useLegacyChangeHandler(props.onChange, props.isMulti);
		const theme = useTheme();

		return (
			<DebouncedSelectAsync
				ref={ref}
				classNamePrefix="fl-select"
				theme={selectTheme}
				components={{ ...defaultComponents, ...components }}
				noOptionsMessage={noOptionsMessage}
				menuPortalTarget={body}
				isDisabled={disabled || isDisabled}
				isClearable={isClearable}
				{...props}
				onChange={onChange}
				styles={selectStyles(props, theme)}
				onKeyDown={e => handleKeyDown(e, onConsumerKeyDown)}
			/>
		);
	},
);

function useBody() {
	const [body, setBody] = useState(null);
	useEffect(() => {
		setBody((window && window.document.body) || null);
	}, []);

	return body;
}

// TODO: Remove in version 6.0
// This undoes the change type normalization introduced in react-select 3
function useLegacyChangeHandler(onChange, isMulti) {
	return useCallback(
		(values, change) => {
			if (onChange) {
				return onChange(isMulti ? values || [] : values, change);
			}
		},
		[isMulti, onChange],
	);
}

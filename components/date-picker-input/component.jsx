import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../popover-v6';
import { PlacementOptionsProps } from '../popover/popper-helpers';
import { Calendar as CalendarIcon } from '../icons';
import { Input } from '../input';
import { colors } from '../shared-styles';
import { dateFunctionProps } from '../date-picker/date-function-props';
import { DatePicker } from '../date-picker/component';
import * as Styled from './styled';

/** Flexible date picker input (with support for many date parsing libraries) */
export function DatePickerInput({
	defaultSelectedDate,
	selectedDate,
	dateFunctions,
	onBlur,
	onFocus,
	parseUserDateString,
	validate,
	onChange,
	disabled,
	placement,
	styleOverrides,
	minDate,
	maxDate,
	children,
	...rest
}) {
	const popoverRef = useRef();

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState(defaultSelectedDate);
	const [text, setText] = useState(null);

	useEffect(() => {
		setCurrentDate(selectedDate);
	}, [selectedDate]);

	const formatDate = useCallback(
		date =>
			dateFunctions.format(
				date,
				dateFunctions.isSameYear(date, new Date()) ? 'MMMM d' : 'MMMM d, yyyy',
			),
		[dateFunctions],
	);

	const handleBlur = useCallback(
		event => {
			setText(null);
			if (onBlur) {
				onBlur(event);
			}
		},
		[onBlur],
	);

	const handleFocus = useCallback(
		event => {
			setText(null);
			if (onFocus) {
				onFocus(event);
			}
		},
		[onFocus],
	);

	const handleChange = useCallback(
		event => {
			const text = event.target.value;
			setIsPopoverOpen(false);
			setText(text);

			const selectedDate = parseUserDateString(text);
			if (validate && !validate(selectedDate)) {
				return;
			}

			this.setState({ selectedDate });
			onChange(selectedDate);
		},
		[parseUserDateString, validate, onChange],
	);

	const handleChangeSelectedDate = useCallback(
		selectedDate => {
			if (validate && validate(selectedDate)) {
				setCurrentDate(selectedDate);
				setText(null);
				setIsPopoverOpen(false);
				onChange(selectedDate);
			}
		},
		[validate, onChange],
	);

	const configChildren = React.Children.toArray(children).filter(
		child => child.type.childConfigComponent,
	);
	const popoverProps = configChildren.find(
		child => child.type.childConfigComponent === DatePickerInputPopover.childConfigComponent,
	)?.props;
	const buttonProps = configChildren.find(
		child => child.type.childConfigComponent === DatePickerInputButton.childConfigComponent,
	)?.props;

	console.log(React.Children.toArray(children), configChildren, buttonProps);

	const defaultValue = defaultSelectedDate ? formatDate(defaultSelectedDate) : '';
	const formattedDate = currentDate ? formatDate(currentDate) : defaultValue;
	const value = text ?? formattedDate;
	const inputStyleOverrides = { width: styleOverrides.inputWidth };
	const popoverStyleOverrides = {
		hideShadow: styleOverrides.hideShadow,
		width: styleOverrides.width,
		padding: styleOverrides.padding,
		border: styleOverrides.border,
		zIndex: styleOverrides.zIndex,
	};
	return (
		<Styled.Container>
			<Input
				{...rest}
				type="text"
				onBlur={handleBlur}
				onChange={handleChange}
				onFocus={handleFocus}
				value={value}
				disabled={disabled}
				borderColor={styleOverrides.inputBorderColor}
				styleOverrides={inputStyleOverrides}
			/>
			<Styled.CalendarButton
				ref={popoverRef}
				disabled={disabled}
				onClick={() => {
					setIsPopoverOpen(isOpen => !isOpen);
				}}
				{...(buttonProps ? buttonProps : {})}
			>
				<Styled.CalendarIconContainer>
					<CalendarIcon />
				</Styled.CalendarIconContainer>
			</Styled.CalendarButton>
			{isPopoverOpen && (
				<Popover
					reference={popoverRef.current}
					placement={placement}
					styleOverrides={popoverStyleOverrides}
					onFocusAway={() => {
						setIsPopoverOpen(false);
					}}
					{...(popoverProps ? popoverProps : {})}
				>
					<Styled.DateTime>
						<DatePicker
							selectedDate={currentDate ?? new Date()}
							setSelectedDate={handleChangeSelectedDate}
							validate={validate}
							dateFunctions={dateFunctions}
							minDate={minDate}
							maxDate={maxDate}
						/>
					</Styled.DateTime>
				</Popover>
			)}
		</Styled.Container>
	);
}

DatePickerInput.defaultProps = {
	placement: 'bottom-start',
	styleOverrides: {
		inputWidth: '100%',
		padding: '16px 20px',
		zIndex: 3,
	},
};

DatePickerInput.propTypes = {
	defaultSelectedDate: PropTypes.instanceOf(Date),
	/** Sets the selected date */
	selectedDate: PropTypes.instanceOf(Date),
	/** Functions that operate on a JS Date object.
	 * The following functions must be provided:
	 *
	 * startOfWeek, startOfMonth, endOfWeek, endOfMonth, getYear, getMonth, getDate, addWeeks, addMonths, subMonths, isBefore, format, isValid
	 *
	 * For details on how these functions should behave see the date-fns (v2) documentation https://date-fns.org
	 *
	 */
	dateFunctions: dateFunctionProps,
	/**
	 * parseUserDateString should be a function that takes a string and returns a js date. For example: https://www.npmjs.com/package/chrono-node (depends on momentjs)
	 */
	parseUserDateString: PropTypes.func.isRequired,
	validate: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
	disabled: PropTypes.bool,
	/** Where on the target the date picker renders */
	placement: PlacementOptionsProps,
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	/** Style overrides, inputWidth is applied to the input */
	styleOverrides: PropTypes.shape({
		inputWidth: PropTypes.string,
		inputBorderColor: PropTypes.string,
		hideShadow: PropTypes.bool,
		width: PropTypes.string,
		padding: PropTypes.string,
		border: PropTypes.string,
		zIndex: PropTypes.number,
	}),
};

function DatePickerInputPopover(props) {
	return <div />;
}
DatePickerInputPopover.childConfigComponent = 'DatePickerInputPopover';

function DatePickerInputButton(props) {
	return <div />;
}
DatePickerInputButton.childConfigComponent = 'DatePickerInputButton';

DatePickerInput.Popover = DatePickerInputPopover;
DatePickerInput.Button = DatePickerInputButton;

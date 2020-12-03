import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getConfigProps } from '../utils';
import { Popover } from '../popover-v6';
import { PlacementOptionsProps } from '../popover/popper-helpers';
import { Calendar as CalendarIcon } from '../icons';
import { Input } from '../input';
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
	inputWidth,
	inputBorderColor,
	hideShadow,
	width,
	padding,
	border,
	zIndex,
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

			setCurrentDate(selectedDate);
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

	const popoverProps = getConfigProps(children, DatePickerInputPopover.childConfigComponent);
	const buttonProps = getConfigProps(children, DatePickerInputButton.childConfigComponent);

	const defaultValue = defaultSelectedDate ? formatDate(defaultSelectedDate) : '';
	const formattedDate = currentDate ? formatDate(currentDate) : defaultValue;
	const value = text ?? formattedDate;
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
				borderColor={inputBorderColor}
				width={inputWidth}
				selectOnFocus
			/>
			<Styled.CalendarButton
				disabled={disabled}
				onClick={() => {
					setIsPopoverOpen(isOpen => !isOpen);
				}}
				{...buttonProps}
			>
				<Styled.CalendarIconContainer ref={popoverRef}>
					<CalendarIcon />
				</Styled.CalendarIconContainer>
			</Styled.CalendarButton>
			{isPopoverOpen && (
				<Popover
					reference={popoverRef.current}
					placement={placement}
					onFocusAway={() => {
						setIsPopoverOpen(false);
					}}
					boxShadow={hideShadow ? 0 : undefined}
					{...{ width, padding, border, zIndex }}
					{...popoverProps}
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
	inputWidth: '100%',
	padding: '16px 20px',
	zIndex: 3,
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
	/** The width to pass to the input element. */
	inputWidth: PropTypes.string,
	/** The border color to pass to the input element. */
	inputBorderColor: PropTypes.string,
	/** Whether to hide the box shadow on the popover element. */
	hideShadow: PropTypes.bool,
	/** The `width` of the calendar popover. */
	width: PropTypes.string,
	/** The `padding` of the calendar popover. */
	padding: PropTypes.string,
	/** The `border` of the calendar popover. */
	border: PropTypes.string,
	/** The `z-index` of the calendar popover. */
	zIndex: PropTypes.number,
};

function DatePickerInputPopover(props) {
	return null;
}
DatePickerInputPopover.childConfigComponent = 'DatePickerInputPopover';

function DatePickerInputButton(props) {
	return null;
}
DatePickerInputButton.childConfigComponent = 'DatePickerInputButton';

DatePickerInput.Popover = DatePickerInputPopover;
DatePickerInput.Button = DatePickerInputButton;

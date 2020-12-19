import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styledSystemPropTypes from '@styled-system/prop-types';
import { common, typography } from '../../theme/system';
import { getConfigProps } from '../utils';
import { Popover } from '../popover-v6';
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
	minDate,
	maxDate,
	children,
	width,
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
			if (!validate || validate(selectedDate)) {
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
		// Redirecting `width` to the container so the calendar button will remain inside the input if
		// width is less than 100%
		<Styled.Container width={width}>
			<Input
				{...rest}
				width="100%"
				type="text"
				onBlur={handleBlur}
				onChange={handleChange}
				onFocus={handleFocus}
				value={value}
				disabled={disabled}
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
					onFocusAway={() => {
						setIsPopoverOpen(false);
					}}
					placement="bottom-start"
					padding="16px 20px"
					zIndex={3}
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
	width: '100%',
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
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	// Input style props
	...common.propTypes,
	...typography.propTypes,
	...styledSystemPropTypes.layout,
	...styledSystemPropTypes.border,
	textStyle: PropTypes.string,
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

import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';
import { useId } from '../shared-hooks';

export function DatePicker({
	dateFunctions,
	value,
	validate,
	minDate,
	maxDate,
	onChange,
	onClose,

	selectedDate: depricatedValue,
	selectedDateRange: depricatedRangeValue,
	setSelectedDate: depricatedValueCallback,
	asDateRangePicker,
}) {
	const {
		getMonth,
		eachWeekOfInterval,
		getMonthInterval,
		eachDayOfInterval,
		getWeekInterval,
		isSameDay,
		isSameMonth,
		formatDay,
		formatTitle,
		getDOWName,
		getDOWNameAbbrv,
		addMonths,
		todaysDate,
		addWeeks,
		startOfWeek,
		endOfWeek,
		addDays,
		getYear,
		isValid,
	} = useDateFunctions(dateFunctions);
	const containerRef = useRef();
	const [currentDate, setCurrentDate] = useState(value ?? depricatedValue ?? todaysDate);
	const [selectedDate, setSelectedDate] = useState(value ?? depricatedValue);
	const currentMonth = getMonth(currentDate);
	const currentYear = getYear(currentDate);

	useEffect(() => {
		if (isValid(value) && !isSameMonth(value, currentDate)) {
			setSelectedDate(value);
		}
	}, [value, currentDate]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setSelectedDate(value);
	}, [value]);

	const daysInMonthByWeek = useMemo(
		() =>
			eachWeekOfInterval(getMonthInterval(currentDate)).map(day =>
				eachDayOfInterval(getWeekInterval(day)),
			),
		[currentMonth, currentYear], // eslint-disable-line react-hooks/exhaustive-deps
	);

	const handleSelectDate = useCallback(
		date => () => {
			if (depricatedValueCallback) {
				depricatedValueCallback(date);
				setSelectedDate(date);
			}

			if (onChange) {
				onChange(date);
			}
			setCurrentDate(date);
		},
		[depricatedValueCallback, onChange],
	);

	const { register } = useKeyboardNav({
		setCurrentDate,
		onCloseMenu: onClose,
		addMonths,
		addWeeks,
		startOfWeek,
		endOfWeek,
		addDays,
		focusCatchRef: containerRef,
	});
	const canGoPrev = !minDate || daysInMonthByWeek[0][0] > minDate;
	const canGoNext =
		!maxDate ||
		daysInMonthByWeek
			.slice(-1)
			.pop()
			.slice(-1)
			.pop();
	const headerId = `date-picker-header-${useId()}`;
	return (
		<Styled.Container aria-labelledby={headerId} ref={containerRef}>
			<Styled.HeaderContainer id={headerId}>
				<Styled.PrevButton
					aria-label="previous month"
					disabled={!canGoPrev}
					onClick={() => setCurrentDate(state => addMonths(state, -1))}
				/>
				<Styled.Header>{formatTitle(currentDate)}</Styled.Header>
				<Styled.NextButton
					aria-label="next month"
					disabled={!canGoNext}
					onClick={() => setCurrentDate(state => addMonths(state, 1))}
				/>
			</Styled.HeaderContainer>
			<Styled.DatesContainer aria-labelledby={headerId}>
				<Styled.DayHeaderRow>
					<tr>
						{Array.from(Array(7)).map((_, i) => (
							<Styled.DayHeader key={i} abbr={getDOWName(i)}>
								{getDOWNameAbbrv(i)}
							</Styled.DayHeader>
						))}
					</tr>
				</Styled.DayHeaderRow>
				<tbody>
					{daysInMonthByWeek.map((week, index) => (
						<Styled.Week key={`${currentMonth}-${currentYear}-${index}`}>
							{week.map((day, dIndex) => (
								<td key={`${currentMonth}-${index}-${dIndex}`}>
									<Styled.Day
										id={`${index}-${dIndex}`}
										{...register(currentMonth)}
										isToday={isSameDay(day, todaysDate)}
										isSelected={isSameDay(day, selectedDate)}
										noSelection={!selectedDate}
										isCurrentDate={isSameDay(day, currentDate)}
										autoFocus={isSameDay(day, currentDate)}
										disabled={!isSameMonth(day, currentDate) || (validate && !validate(day))}
										onClick={handleSelectDate(day)}
									>
										{formatDay(day)}
									</Styled.Day>
								</td>
							))}
						</Styled.Week>
					))}
				</tbody>
			</Styled.DatesContainer>
		</Styled.Container>
	);
}

DatePicker.propTypes = {
	/** Sets the selected date */
	selectedDate: PropTypes.instanceOf(Date),
	/** Sets the selected date range (use with asDateRange prop) */
	selectedDateRange: PropTypes.shape({
		start: PropTypes.instanceOf(Date),
		end: PropTypes.instanceOf(Date),
	}),
	/** A callback that retrieves the currently selected date or date range whenever the the selected dates change. */
	setSelectedDate: PropTypes.func.isRequired,
	/** Specifies that the component should function as a date range picker */
	asDateRangePicker: PropTypes.bool,
	/** Takes a date as a parameter and returns false if that date is invalid */
	validate: PropTypes.func,
	// dateFunctions: dateFunctionProps,
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
};

function useKeyboardNav({
	setCurrentDate,
	onCloseMenu,
	addMonths,
	addWeeks,
	startOfWeek,
	endOfWeek,
	addDays,
	focusCatchRef,
}) {
	const currentMonth = useRef();
	const dayRefs = useRef([]);

	const register = useCallback(
		monthRef => {
			if (monthRef !== currentMonth.current) {
				dayRefs.current = [];
				currentMonth.current = monthRef;
			}

			return {
				ref: ref => {
					if (!ref) {
						return;
					}

					const newRef = React.createRef();
					newRef.current = ref;

					const [weekIndex, dayIndex] = newRef.current.id.split('-').map(x => Number.parseInt(x));
					if (dayRefs.current.length <= weekIndex) {
						dayRefs.current.length = weekIndex + 1;
					}
					if (!dayRefs.current[weekIndex]) {
						dayRefs.current[weekIndex] = new Array(7);
					}

					dayRefs.current[weekIndex][dayIndex] = newRef;
				},
				onKeyDown: event => {
					const [weekIndex, dayIndex] = event.target.id.split('-').map(x => Number.parseInt(x));
					const shiftKey = event.shiftKey;
					switch (event.key) {
						case handledKeys.escape: {
							if (onCloseMenu) {
								event.preventDefault();
								onCloseMenu();
							}
							break;
						}

						case handledKeys.arrowUp: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => addWeeks(currentDate, -1));
							if (weekIndex > 0 && !dayRefs.current[weekIndex - 1][dayIndex].current.disabled) {
								dayRefs.current[weekIndex - 1][dayIndex].current.focus();
							}
							break;
						}
						case handledKeys.arrowDown: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => addWeeks(currentDate, 1));
							if (
								weekIndex < dayRefs.current.length - 1 &&
								!dayRefs.current[weekIndex + 1][dayIndex].current.disabled
							) {
								dayRefs.current[weekIndex + 1][dayIndex].current.focus();
							}
							break;
						}
						case handledKeys.arrowLeft: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => addDays(currentDate, -1));
							if (dayIndex > 0 && !dayRefs.current[weekIndex][dayIndex - 1].current.disabled) {
								dayRefs.current[weekIndex][dayIndex - 1].current.focus();
							}
							if (dayIndex === 0 && weekIndex > 0) {
								dayRefs.current[weekIndex - 1][6].current.focus();
							}
							break;
						}
						case handledKeys.arrowRight: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => addDays(currentDate, 1));
							if (dayIndex < 6 && !dayRefs.current[weekIndex][dayIndex + 1].current.disabled) {
								dayRefs.current[weekIndex][dayIndex + 1].current.focus();
							}
							if (dayIndex === 6 && weekIndex < dayRefs.current.length - 1) {
								dayRefs.current[weekIndex + 1][0].current.focus();
							}
							break;
						}
						case handledKeys.home: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => startOfWeek(currentDate));
							if (dayIndex > 0 && !dayRefs.current[weekIndex][0].current.disabled) {
								dayRefs.current[weekIndex][0].current.focus();
							}
							break;
						}
						case handledKeys.end: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => endOfWeek(currentDate));
							if (dayIndex < 6 && !dayRefs.current[weekIndex][6].current.disabled) {
								dayRefs.current[weekIndex][6].current.focus();
							}
							break;
						}
						case handledKeys.pageUp: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => addMonths(currentDate, shiftKey ? -12 : -1));
							break;
						}
						case handledKeys.pageDown: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => addMonths(currentDate, shiftKey ? 12 : 1));
							break;
						}
						default:
							return;
					}
				},
			};
		},
		[
			onCloseMenu,
			focusCatchRef,
			setCurrentDate,
			addWeeks,
			addDays,
			startOfWeek,
			endOfWeek,
			addMonths,
		],
	);

	return {
		register,
	};
}

const handledKeys = {
	arrowUp: 'ArrowUp',
	arrowDown: 'ArrowDown',
	arrowLeft: 'ArrowLeft',
	arrowRight: 'ArrowRight',
	home: 'Home',
	end: 'End',
	pageUp: 'PageUp',
	pageDown: 'PageDown',
	escape: 'Escape',
};

function useDateFunctions(dateFunctions) {
	const [todaysDate] = useState(new Date());

	if (!dateFunctions) {
		if (process.env.NODE_ENV !== 'production') {
			throw new Error(
				'DatePicker requires dateFunctions to be supplied. See https://faithlife.github.io/styled-ui/#/date-picker/variations for more info.',
			);
		}
	}

	if (dateFunctions.__faithlifeStyledUIDateFunctionsWrapperVersion) {
		return dateFunctions;
	} else {
		const {
			getMonth,
			startOfWeek,
			startOfMonth,
			endOfWeek,
			endOfMonth,
			isBefore,
			addWeeks,
			getYear,
			getDate,
			format,
			addMonths,
			isValid,
		} = dateFunctions;
		return {
			getMonth,
			getWeekInterval: date => ({ start: startOfWeek(date), end: endOfWeek(date) }),
			getMonthInterval: date => ({
				start: startOfWeek(startOfMonth(date)),
				end: endOfWeek(endOfMonth(date)),
			}),
			eachWeekOfInterval: ({ start: firstDay, end: lastDay }) => {
				const weeks = [];
				for (
					let walker = new Date(firstDay.getTime());
					isBefore(walker, lastDay);
					walker = addWeeks(walker, 1)
				) {
					weeks.push(walker);
				}

				return weeks;
			},
			eachDayOfInterval: ({ start: sunday }) => {
				const week = [];
				const year = getYear(sunday);
				const month = getMonth(sunday);
				const date = getDate(sunday);

				for (let index = 0; index < 7; index++) {
					week.push(new Date(year, month, date + index));
				}

				return week;
			},
			isSameDay: (date1, date2) =>
				getDate(date1) === getDate(date2) &&
				getMonth(date1) === getMonth(date2) &&
				getYear(date1) === getYear(date2),
			isSameMonth: (date1, date2) =>
				getMonth(date1) === getMonth(date2) && getYear(date1) === getYear(date2),
			formatTitle: date => format(date, 'MMMM yyyy'),
			formatDay: date => format(date, 'd'),
			getDOWNameAbbrv: dayIndex => depricated_dayOfWeekNames[dayIndex].abbrv,
			getDOWName: dayIndex => depricated_dayOfWeekNames[dayIndex].name,
			addDays: (date, amount) => {
				const newDate = new Date(Number(date));
				newDate.setDate(date.getDate() + amount);
				return newDate;
			},
			addMonths,
			addWeeks,
			startOfWeek,
			endOfWeek,
			getYear,
			isValid,
			todaysDate,
		};
	}
}

const depricated_dayOfWeekNames = [
	{
		name: 'Sunday',
		abbrv: 'S',
	},
	{
		name: 'Monday',
		abbrv: 'M',
	},
	{
		name: 'Tuesday',
		abbrv: 'T',
	},
	{
		name: 'Wednesday',
		abbrv: 'W',
	},
	{
		name: 'Thursday',
		abbrv: 'T',
	},
	{
		name: 'Friday',
		abbrv: 'F',
	},
	{
		name: 'Saturday',
		abbrv: 'S',
	},
];

import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
		isValid,
	} = useDateFunctions(dateFunctions);
	const [currentDate, setCurrentDate] = useState(value ?? depricatedValue ?? todaysDate);
	const [selectedDate, setSelectedDate] = useState(value ?? depricatedValue);
	const currentMonth = getMonth(currentDate);

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
		[currentMonth], // eslint-disable-line react-hooks/exhaustive-deps
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
		},
		[depricatedValueCallback, onChange],
	);

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
		<Styled.Container aria-labelledby={headerId}>
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
						<Styled.Week key={`${currentMonth}-${index}`}>
							{week.map((day, dIndex) => (
								<td style={{ width: '30px' }} key={`${currentMonth}-${index}-${dIndex}`}>
									<Styled.Day
										isToday={isSameDay(day, todaysDate)}
										isSelected={isSameDay(day, selectedDate)}
										noSelection={!selectedDate}
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
			addMonths,
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

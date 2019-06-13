import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CalendarDate } from '../calendar-date';
import { dateFunctionProps } from '../date-function-props';

const StyledCalendarWeek = styled.div`
	display: flex;

	&:last-of-type {
		border-bottom: none;
	}
`;

export function CalendarWeek(props) {
	const {
		days,
		currentMonth,
		selectedDate,
		selectedDateRange,
		setSelectedDate,
		validate,
		dateFunctions,
		asDateRangePicker,
	} = props;

	return (
		<StyledCalendarWeek>
			{days.map(day => (
				<CalendarDate
					key={`day-${day}`}
					currentMonth={currentMonth}
					date={day}
					selectedDate={selectedDate}
					selectedDateRange={selectedDateRange}
					setSelectedDate={setSelectedDate}
					validate={validate}
					dateFunctions={dateFunctions}
					asDateRangePicker={asDateRangePicker}
				/>
			))}
		</StyledCalendarWeek>
	);
}

CalendarWeek.PropTypes = {
	days: PropTypes.arrayOf(PropTypes.object).isRequired,
	currentMonth: PropTypes.number.isRequired,
	selectedDate: PropTypes.instanceOf(Date),
	selectedDateRange: PropTypes.shape({
		start: PropTypes.instanceOf(Date),
		end: PropTypes.instanceOf(Date),
	}),
	setSelectedDate: PropTypes.func.isRequired,
	validate: PropTypes.func,
	dateFunctions: dateFunctionProps,
	asDateRangePicker: PropTypes.bool,
};

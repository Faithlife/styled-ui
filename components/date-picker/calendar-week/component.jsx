import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CalendarDate } from '../calendar-date/component.jsx';
import { dateFunctionProps } from '../date-function-props';

const StyledCalendarWeek = styled.div`
	display: flex;
	&:last-of-type {
		border-bottom: none;
	}
`;

export class CalendarWeek extends Component {
	static propTypes = {
		days: PropTypes.arrayOf(PropTypes.object).isRequired,
		currentMonth: PropTypes.number.isRequired,
		selectedDate: PropTypes.instanceOf(Date),
		setSelectedDate: PropTypes.func.isRequired,
		validate: PropTypes.func,
		dateFunctions: dateFunctionProps,
	};

	render() {
		return (
			<StyledCalendarWeek>
				{this.props.days.map(day => (
					<CalendarDate
						key={`day-${day}`}
						currentMonth={this.props.currentMonth}
						date={day}
						selectedDate={this.props.selectedDate}
						setSelectedDate={this.props.setSelectedDate}
						validate={this.props.validate}
						dateFunctions={this.props.dateFunctions}
					/>
				))}
			</StyledCalendarWeek>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateFunctionProps } from '../date-function-props';
import * as Styled from './styled';

export class CalendarDate extends Component {
	static propTypes = {
		currentMonth: PropTypes.number.isRequired,
		date: PropTypes.object.isRequired,
		setSelectedDate: PropTypes.func.isRequired,
		validate: PropTypes.func,
		selectedDate: PropTypes.instanceOf(Date),
		dateFunctions: dateFunctionProps,
	};

	setSelectedDate = () => this.props.setSelectedDate(this.props.date);

	areDatesEqual = (date1, date2) =>
		this.props.dateFunctions.getDate(date1) === this.props.dateFunctions.getDate(date2) &&
		this.props.dateFunctions.getMonth(date1) === this.props.dateFunctions.getMonth(date2) &&
		this.props.dateFunctions.getYear(date1) === this.props.dateFunctions.getYear(date2);

	render() {
		const currentDate = new Date();
		const selectedDate = this.props.selectedDate;
		const date = this.props.date;
		let currentDayDot = null;
		let CalendarWeekday = Styled.CalendarWeekDay;
		const { getMonth, format, isValid } = this.props.dateFunctions;

		if (selectedDate != null && isValid(selectedDate) && this.areDatesEqual(selectedDate, date)) {
			CalendarWeekday = Styled.CalendarWeekDaySelected;
		}

		if (
			this.props.currentMonth !== getMonth(date) ||
			(this.props.validate && !this.props.validate(date))
		) {
			CalendarWeekday = Styled.CalendarWeekDayGrayedOut;
		}

		if (this.areDatesEqual(currentDate, date)) {
			currentDayDot = <Styled.CalendarWeekDayCurrentDay />;
		}

		return (
			<CalendarWeekday
				onClick={this.setSelectedDate}
				tabIndex="-1"
				disabled={this.props.validate && !this.props.validate(date)}
			>
				<Styled.CalendarDateLabel>{format(date, 'd')}</Styled.CalendarDateLabel>
				{currentDayDot}
			</CalendarWeekday>
		);
	}
}

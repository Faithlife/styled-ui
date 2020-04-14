import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateFunctionProps } from '../date-function-props';
import * as Styled from './styled';

export class CalendarDate extends Component {
	static propTypes = {
		currentMonth: PropTypes.number.isRequired,
		date: PropTypes.instanceOf(Date),
		setSelectedDate: PropTypes.func.isRequired,
		selectedDateRange: PropTypes.shape({
			start: PropTypes.instanceOf(Date),
			end: PropTypes.instanceOf(Date),
		}),
		validate: PropTypes.func,
		selectedDate: PropTypes.instanceOf(Date),
		dateFunctions: dateFunctionProps,
		asDateRangePicker: PropTypes.bool,
	};

	setSelectedDate = () => this.props.setSelectedDate(this.props.date);

	areDatesEqual = (date1, date2) =>
		this.props.dateFunctions.getDate(date1) === this.props.dateFunctions.getDate(date2) &&
		this.props.dateFunctions.getMonth(date1) === this.props.dateFunctions.getMonth(date2) &&
		this.props.dateFunctions.getYear(date1) === this.props.dateFunctions.getYear(date2);

	getDayComponent = () => {
		const isCurrentMonth = this.isCurrentMonth();
		const { date, dateFunctions, selectedDate, selectedDateRange, validate } = this.props;
		const { isValid, isBefore } = dateFunctions;

		let CalendarWeekday = Styled.CalendarWeekDay;
		if (selectedDate) {
			if (selectedDate && isValid(selectedDate) && this.areDatesEqual(selectedDate, date)) {
				CalendarWeekday = Styled.CalendarWeekDaySelected;
			}

			if (!isCurrentMonth || (validate && !validate(date))) {
				CalendarWeekday = Styled.CalendarWeekDayGrayedOut;
			}
			return CalendarWeekday;
		}
		if (
			selectedDateRange &&
			((isValid(selectedDateRange.start) && this.areDatesEqual(selectedDateRange.start, date)) ||
				(isValid(selectedDateRange.end) && this.areDatesEqual(selectedDateRange.end, date)))
		) {
			CalendarWeekday = Styled.CalendarWeekDaySelected;
		} else if (
			selectedDateRange &&
			isBefore(selectedDateRange.start, date) &&
			isBefore(date, selectedDateRange.end)
		) {
			CalendarWeekday = Styled.CalendarWeekDayInRange;
		}

		if (!isCurrentMonth || (validate && !validate(date))) {
			CalendarWeekday = Styled.CalendarWeekDayGrayedOut;
		}

		return CalendarWeekday;
	};

	isCurrentMonth = () => {
		const { date, dateFunctions, currentMonth } = this.props;
		return currentMonth === dateFunctions.getMonth(date);
	};

	render() {
		const currentDate = new Date();
		const { date, asDateRangePicker } = this.props;
		let currentDayDot = null;
		const { format } = this.props.dateFunctions;
		const isCurrentMonth = this.isCurrentMonth();

		const CalendarDay = this.getDayComponent();

		if (this.areDatesEqual(currentDate, date)) {
			currentDayDot = <Styled.CalendarWeekDayCurrentDay />;
		}

		return (
			<Styled.CalendarWeekDayButton
				onClick={this.setSelectedDate}
				disabled={this.props.validate && !this.props.validate(date)}
			>
				<CalendarDay>
					<Styled.CalendarDateLabel>
						{asDateRangePicker && !isCurrentMonth ? null : format(date, 'd')}
					</Styled.CalendarDateLabel>
					{((asDateRangePicker && isCurrentMonth) || !asDateRangePicker) && currentDayDot}
				</CalendarDay>
			</Styled.CalendarWeekDayButton>
		);
	}
}

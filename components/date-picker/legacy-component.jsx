import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Caret } from '../icons';
import { colors } from '../shared-styles';
import { dateFunctionProps } from './date-function-props';
import * as Styled from './legacy-styled';
import { CalendarWeek } from './calendar-week';

function generateWeek(sunday, { getYear, getMonth, getDate }) {
	const week = [];
	const year = getYear(sunday);
	const month = getMonth(sunday);
	const date = getDate(sunday);

	for (let index = 0; index < 7; index++) {
		week.push(new Date(year, month, date + index));
	}

	return week;
}

function generateWeeks(month, dateFunctions) {
	const { startOfWeek, startOfMonth, endOfWeek, endOfMonth, isBefore, addWeeks } = dateFunctions;
	const firstDay = startOfWeek(startOfMonth(month));
	const lastDay = endOfWeek(endOfMonth(month));
	const weeks = [];

	for (
		let walker = new Date(firstDay.getTime());
		isBefore(walker, lastDay);
		walker = addWeeks(walker, 1)
	) {
		weeks.push(generateWeek(walker, dateFunctions));
	}

	return weeks;
}

/** Standard date picker control (with support for many different date parsing libraries) */
export class DatePicker extends Component {
	static propTypes = {
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
		dateFunctions: dateFunctionProps,
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
	};

	UNSAFE_componentWillMount() {
		const selectedDate = this.props.selectedDate;
		const date = selectedDate ? this.props.selectedDate : new Date();
		this.setMonth(date);
	}

	setMonth = currentMonth => {
		this.setState({
			currentMonth,
			weeks: generateWeeks(currentMonth, this.props.dateFunctions),
		});
	};

	setSelectedDate = date => {
		const { dateFunctions, selectedDateRange, asDateRangePicker, setSelectedDate } = this.props;
		if (asDateRangePicker) {
			let newDateRange;
			if (selectedDateRange && selectedDateRange.start && !selectedDateRange.end) {
				if (dateFunctions.isBefore(selectedDateRange.start, date)) {
					newDateRange = { start: selectedDateRange.start, end: date };
				} else {
					newDateRange = { start: date, end: selectedDateRange.start };
				}
			} else {
				newDateRange = { start: date };
			}
			setSelectedDate(newDateRange);
		} else {
			setSelectedDate(date);
		}
	};

	decrementMonth = () => {
		if (!this.canDecrementMonth(this.state.weeks)) {
			return;
		}
		this.setMonth(this.props.dateFunctions.subMonths(this.state.currentMonth, 1));
	};

	incrementMonth = () => {
		if (!this.canIncrementMonth(this.state.weeks)) {
			return;
		}
		this.setMonth(this.props.dateFunctions.addMonths(this.state.currentMonth, 1));
	};

	canDecrementMonth = weeks => {
		const firstDay = weeks[0][0];
		return !this.props.minDate || this.props.minDate < firstDay;
	};

	canIncrementMonth = weeks => {
		const lastDay = weeks[weeks.length - 1][weeks[weeks.length - 1].length - 1];
		return !this.props.maxDate || this.props.maxDate > lastDay;
	};

	render() {
		const {
			selectedDate,
			dateFunctions,
			selectedDateRange,
			asDateRangePicker,
			validate,
			minDate,
			maxDate,
		} = this.props;
		const { currentMonth, weeks } = this.state;

		return (
			<Fragment>
				<Styled.Header>
					<Styled.ChangeMonth
						onClick={this.decrementMonth}
						visuallyDisabled={!this.canDecrementMonth(weeks)}
						tabIndex="0"
					>
						<Caret
							style={{
								transform: 'scaleX(-1)',
								color: colors.gray66,
								visibility: this.canDecrementMonth(weeks) ? 'visible' : 'hidden',
							}}
						/>
					</Styled.ChangeMonth>

					<Styled.MonthLabel>{dateFunctions.format(currentMonth, 'MMMM yyyy')}</Styled.MonthLabel>
					<Styled.ChangeMonth
						onClick={this.incrementMonth}
						visuallyDisabled={!this.canIncrementMonth(weeks)}
						tabIndex="0"
					>
						<Caret
							style={{
								color: colors.gray66,
								visibility: this.canIncrementMonth(weeks) ? 'visible' : 'hidden',
							}}
						/>
					</Styled.ChangeMonth>
				</Styled.Header>
				<Styled.Week>
					<Styled.WeekDay>S</Styled.WeekDay>
					<Styled.WeekDay>M</Styled.WeekDay>
					<Styled.WeekDay>T</Styled.WeekDay>
					<Styled.WeekDay>W</Styled.WeekDay>
					<Styled.WeekDay>T</Styled.WeekDay>
					<Styled.WeekDay>F</Styled.WeekDay>
					<Styled.WeekDay>S</Styled.WeekDay>
				</Styled.Week>
				<Styled.Month>
					{weeks.map(week => (
						<CalendarWeek
							currentMonth={dateFunctions.getMonth(currentMonth)}
							days={week}
							key={`week-${week[0]}`}
							selectedDate={asDateRangePicker ? null : selectedDate}
							selectedDateRange={asDateRangePicker ? selectedDateRange : null}
							asDateRangePicker={asDateRangePicker}
							setSelectedDate={this.setSelectedDate}
							validate={validate}
							dateFunctions={dateFunctions}
							minDate={minDate}
							maxDate={maxDate}
						/>
					))}
				</Styled.Month>
			</Fragment>
		);
	}
}

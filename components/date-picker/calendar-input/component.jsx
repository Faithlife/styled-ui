import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { dateFunctionProps } from '../date-function-props';
import { Caret } from '../../icons';
import { colors } from '../../shared-styles';
import * as Styled from './styled.jsx';
import { CalendarWeek } from './calendar-week/component.jsx';

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

export class CalendarInput extends Component {
	static propTypes = {
		selectedDate: PropTypes.instanceOf(Date),
		setSelectedDate: PropTypes.func.isRequired,
		validate: PropTypes.func,
		dateFunctions: dateFunctionProps,
	};

	componentWillMount() {
		const selectedDate = this.props.selectedDate;
		const date = selectedDate != null ? this.props.selectedDate : new Date();
		this.setMonth(date);
	}

	setMonth = currentMonth => {
		this.setState({
			currentMonth,
			weeks: generateWeeks(currentMonth, this.props.dateFunctions),
		});
	};

	decrementMonth = () =>
		this.setMonth(this.props.dateFunctions.subMonths(this.state.currentMonth, 1));

	incrementMonth = () =>
		this.setMonth(this.props.dateFunctions.addMonths(this.state.currentMonth, 1));

	render() {
		const { selectedDate, dateFunctions } = this.props;
		const { currentMonth, weeks } = this.state;
		return (
			<Fragment>
				<Styled.Header>
					<Styled.ChangeMonth onClick={this.decrementMonth} tabIndex="-1">
						<Caret style={{ transform: 'scaleX(-1)', color: colors.blueBase }} />
					</Styled.ChangeMonth>
					<Styled.MonthLabel>{dateFunctions.format(currentMonth, 'MMMM yyyy')}</Styled.MonthLabel>
					<Styled.ChangeMonth onClick={this.incrementMonth} tabIndex="-1">
						<Caret style={{ color: colors.blueBase }} />
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
							selectedDate={selectedDate}
							setSelectedDate={this.props.setSelectedDate}
							validate={this.props.validate}
							dateFunctions={this.props.dateFunctions}
						/>
					))}
				</Styled.Month>
			</Fragment>
		);
	}
}

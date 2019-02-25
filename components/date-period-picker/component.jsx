import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { DatePicker, Input } from '../main';
import { dateFunctionProps } from '../date-picker/date-function-props';
import * as Styled from './styled';

const DATE_FORMAT_STRING = 'M/d/yyyy';

/**
 * DatePicker with predefined options for periods (e.g. last 7 days, trailing year)
 * Designed to be shown within a popover control
 */
export class DatePeriodPicker extends PureComponent {
	static propTypes = {
		datePeriods: PropTypes.arrayOf(
			PropTypes.shape({
				displayName: PropTypes.string.isRequired,
				dateRange: PropTypes.shape({
					start: PropTypes.instanceOf(Date),
					end: PropTypes.instanceOf(Date),
				}),
			}),
		).isRequired,
		/** Sets the selected date range */
		selectedDateRange: PropTypes.shape({
			start: PropTypes.instanceOf(Date),
			end: PropTypes.instanceOf(Date),
		}),
		/** Function to parse a date of format M/d/yyyy into a date object. See https://date-fns.org/v2.0.0-alpha.25/docs/parse for details */
		parseDate: PropTypes.func.isRequired,
		/** Returns a date when selected. If asDateRangePicker is true, it will return a date range object matching the selectedDateRange prop shape */
		setSelectedDate: PropTypes.func.isRequired,
		/** Takes a date as a parameter and returns false if that date is invalid */
		validate: PropTypes.func,
		dateFunctions: dateFunctionProps,
		/** Debounce value for date inputs. Defaults to 500ms */
		debounce: PropTypes.number,
	};

	static defaultProps = {
		debounce: 500,
	};

	static getDerivedStateFromProps(props, state) {
		const inputValues = { ...state.inputValues };
		if (
			(props.selectedDateRange &&
				state.selectedDateRange &&
				props.selectedDateRange.start !== state.selectedDateRange.start) ||
			(props.selectedDateRange && !state.selectedDateRange)
		) {
			inputValues.start =
				props.selectedDateRange && props.selectedDateRange.start
					? props.dateFunctions.format(props.selectedDateRange.start, DATE_FORMAT_STRING)
					: state.inputValues.start;
		}

		if (
			(props.selectedDateRange &&
				state.selectedDateRange &&
				props.selectedDateRange.end !== state.selectedDateRange.end) ||
			(props.selectedDateRange && !state.selectedDateRange)
		) {
			inputValues.end =
				props.selectedDateRange && props.selectedDateRange.end
					? props.dateFunctions.format(props.selectedDateRange.end, DATE_FORMAT_STRING)
					: state.inputValues.end;
		}

		return { inputValues, selectedDateRange: props.selectedDateRange };
	}

	state = {
		inputValues: {
			start:
				this.props.selectedDateRange && this.props.selectedDateRange.start
					? this.props.dateFunctions.format(this.props.selectedDateRange.start, DATE_FORMAT_STRING)
					: null,
			end:
				this.props.selectedDateRange && this.props.selectedDateRange.end
					? this.props.dateFunctions.format(this.props.selectedDateRange.end, DATE_FORMAT_STRING)
					: null,
		},
		selectedDateRange: this.props.selectedDateRange,
	};

	parseAndUpdateDate = debounce((value, input) => {
		const parsedDate = this.props.parseDate(value, DATE_FORMAT_STRING, new Date());
		if (parsedDate && !isNaN(parsedDate) && this.props.validate(parsedDate)) {
			let selectedDate;
			if (
				(input === 'start' &&
					this.state.selectedDateRange &&
					parsedDate <= this.state.selectedDateRange.end) ||
				(input === 'end' &&
					this.props.selectedDateRange &&
					parsedDate >= this.state.selectedDateRange.start)
			) {
				selectedDate = { ...this.state.selectedDateRange, [input]: parsedDate };
			} else {
				selectedDate = { [input]: parsedDate };
				this.setState({ inputValues: { [input]: value } });
			}

			this.props.setSelectedDate(selectedDate);
		}
	}, this.props.debounce);

	handleInputValueChange = (value, input) => {
		this.setState(state => ({ inputValues: { ...state.inputValues, [input]: value } }));
		this.parseAndUpdateDate(value, input);
	};

	render() {
		const { setSelectedDate, validate, dateFunctions, datePeriods } = this.props;
		const {
			inputValues: { start, end },
			selectedDateRange,
		} = this.state;

		return (
			<Styled.Container>
				{datePeriods.map(datePeriod => (
					<Styled.DatePeriod
						key={datePeriod.displayName}
						onClick={() => {
							setSelectedDate(datePeriod.dateRange);
						}}
					>
						{datePeriod.displayName}
					</Styled.DatePeriod>
				))}
				<Styled.DateInputContainer>
					<Styled.Label>
						<Styled.LabelText>From</Styled.LabelText>
						<Input
							placeholder="mm/dd/yyyy"
							value={start}
							onChange={event => this.handleInputValueChange(event.target.value, 'start')}
							small
						/>
					</Styled.Label>
					<Styled.Label>
						<Styled.LabelText>To</Styled.LabelText>
						<Input
							placeholder="mm/dd/yyyy"
							value={end}
							onChange={event => this.handleInputValueChange(event.target.value, 'end')}
							small
						/>
					</Styled.Label>
				</Styled.DateInputContainer>
				<Styled.DatePickerContainer>
					<DatePicker
						asDateRangePicker
						selectedDateRange={selectedDateRange}
						setSelectedDate={setSelectedDate}
						validate={validate}
						dateFunctions={dateFunctions}
					/>
				</Styled.DatePickerContainer>
			</Styled.Container>
		);
	}
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { DatePicker } from '../date-picker';
import { Input } from '../input';
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
				}).isRequired,
			}).isRequired,
		).isRequired,
		/** Sets the selected date range */
		selectedDateRange: PropTypes.shape({
			start: PropTypes.instanceOf(Date),
			end: PropTypes.instanceOf(Date),
		}),
		/** Function to parse a date of format M/d/yyyy into a date object. See https://date-fns.org/v2.0.0-alpha.25/docs/parse for details */
		parseDate: PropTypes.func.isRequired,
		/**
		 * A callback that retrieves the currently selected date range and (optionally) the index of the selected date period whenever the the selected dates change.
		 * @type {(dateRange: { start: Date, end: Date }, index?: number) => void}
		 */
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

			this.props.setSelectedDate(selectedDate, this.getDatePeriodIndex(selectedDate));
		}
	}, this.props.debounce);

	handleInputValueChange = (value, input) => {
		this.setState(state => ({ inputValues: { ...state.inputValues, [input]: value } }));
		this.parseAndUpdateDate(value, input);
	};

	/**
	 * Gets the index of a passed date period that happens to match a manually selected date range, if
	 * one matches.
	 * @param {{ start: Date, end: Date }} dateRange - The manually selected start and end dates.
	 * @return {number | null} The index of a matching date period or `null` if no period matches.
	 */
	getDatePeriodIndex = ({ start, end }) => {
		if (start === undefined || end === undefined || start === null || end === null) {
			return null;
		}

		for (const datePeriod of this.getUniqueDatePeriods()) {
			if (
				isSameDay(start, datePeriod.dateRange.start) &&
				isSameDay(end, datePeriod.dateRange.end)
			) {
				return datePeriod.index;
			}
		}

		return null;

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		function isSameDay(date1, date2) {
			return new Date(date1).setHours(0, 0, 0, 0) === new Date(date2).setHours(0, 0, 0, 0);
		}
	};

	/**
	 * Returns only the first date period of each display name, retaining the original array index in
	 * a new `index` property. Also sends a console warning in development environments when
	 * duplicates are passed.
	 * @returns {Array<{ index: number; displayName: string; dateRange: { start: Date; end: Date } }}
	 */
	getUniqueDatePeriods = () => {
		const uniqueDatePeriods = [];

		for (let i = 0; i < this.props.datePeriods.length; i++) {
			const currentPeriod = this.props.datePeriods[i];
			const uniqueDisplayNames = uniqueDatePeriods.map(({ displayName }) => displayName);

			if (uniqueDisplayNames.includes(currentPeriod.displayName)) {
				if (process.env.NODE_ENV !== 'production') {
					console.warn(
						`A \`DatePeriodPicker\` has been passed multiple date periods named "${
							currentPeriod.displayName
						}". Only the first "${currentPeriod.displayName}" period has been passed.`,
					);
				}
			} else {
				uniqueDatePeriods.push(Object.assign({ index: i }, currentPeriod));
			}
		}

		return uniqueDatePeriods;
	};

	render() {
		const { setSelectedDate, validate, dateFunctions } = this.props;
		const {
			inputValues: { start, end },
			selectedDateRange,
		} = this.state;

		return (
			<Styled.Container>
				{this.getUniqueDatePeriods().map(({ index, displayName, dateRange }) => (
					<Styled.DatePeriod
						key={displayName}
						onClick={() => {
							setSelectedDate(dateRange, index);
						}}
					>
						{displayName}
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
						setSelectedDate={dateRange =>
							setSelectedDate(dateRange, this.getDatePeriodIndex(dateRange))
						}
						validate={validate}
						dateFunctions={dateFunctions}
					/>
				</Styled.DatePickerContainer>
			</Styled.Container>
		);
	}
}

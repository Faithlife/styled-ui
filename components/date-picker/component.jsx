import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../bootstrap';
import { Calendar as CalendarIcon } from '../icons';
import { colors } from '../shared-styles';
import { dateFunctionProps } from './date-function-props';
import * as Styled from './styled.jsx';
import { CalendarInput } from './calendar-input/component.jsx';

export class DatePicker extends PureComponent {
	static propTypes = {
		defaultSelectedDate: PropTypes.instanceOf(Date),
		dateFunctions: dateFunctionProps,
		validate: PropTypes.func,
		onBlur: PropTypes.func,
		onChange: PropTypes.func.isRequired,
		onFocus: PropTypes.func,
		disabled: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.icon = React.createRef();

		this.state = {
			showCalendar: false,
			selectedDate: this.props.defaultSelectedDate,
		};
	}

	componentDidUpdate(prevState) {
		if (prevState.showCalendar !== this.state.showCalendar) {
			if (this.state.showCalendar) {
				document.addEventListener('click', this.onDocumentClick);
			} else {
				document.removeEventListener('click', this.onDocumentClick);
			}
		}
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.onDocumentClick);
	}

	onDocumentClick = () => this.setState({ showCalendar: false });

	openCalendar = () => !this.state.showCalendar && this.setState({ showCalendar: true });

	formatDate = date =>
		this.props.dateFunctions.format(
			date,
			this.props.dateFunctions.isSameYear(date, new Date()) ? 'MMMM d' : 'MMMM d, yyyy',
		);

	isFocused = () => document.activeElement === this._input;
	toggleCalendar = () => {
		this.setState(state => ({ showCalendar: !state.showCalendar }));
	};

	handleBlur = event => {
		this.setState({ text: null });
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	};

	handleFocus = event => {
		event.target.select();
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	};

	handleChange = ({ target }) => this.handleTextChange(target.value);

	handleChangeSelectedDate = selectedDate => {
		this.setState({ selectedDate, text: null });
		this.props.onChange(selectedDate);
	};

	handleTextChange = text => {
		this.setState({
			showCalendar: false,
			text,
		});

		const selectedDate = this.props.dateFunctions.parseUserDateString(text);
		this.setState({ selectedDate });
		this.props.onChange(selectedDate);
	};

	handlePopoutClicked = event => event.nativeEvent.stopImmediatePropagation();

	renderCalendar = selectedDate => (
		<Styled.DateTime>
			<CalendarInput
				selectedDate={selectedDate}
				setSelectedDate={this.handleChangeSelectedDate}
				validate={this.props.validate}
				dateFunctions={this.props.dateFunctions}
			/>
		</Styled.DateTime>
	);

	render() {
		const { disabled, defaultSelectedDate } = this.props;
		const { text, selectedDate, showCalendar } = this.state;

		const defaultValue = defaultSelectedDate != null ? this.formatDate(defaultSelectedDate) : '';
		const formattedDate = selectedDate != null ? this.formatDate(selectedDate) : defaultValue;
		const value = text != null ? text : formattedDate;

		return (
			<Styled.Container>
				<Styled.Input
					type="text"
					onBlur={this.handleBlur}
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					value={value}
					disabled={disabled}
				/>
				<Styled.CalendarButton innerRef={this.icon} onClick={!disabled ? this.openCalendar : null}>
					<CalendarIcon style={{ color: colors.flGray }} />
				</Styled.CalendarButton>
				{showCalendar && (
					<Bootstrap.Popover
						placement="right"
						isOpen={showCalendar}
						target={this.icon.current}
						toggle={this.toggleCalendar}
					>
						<Styled.CalendarPopout onClick={this.handlePopoutClicked}>
							{this.renderCalendar(selectedDate || new Date())}
						</Styled.CalendarPopout>
					</Bootstrap.Popover>
				)}
			</Styled.Container>
		);
	}
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PopoverManager, PopoverReference, Popover } from '../popover';
import { PlacementOptionsProps } from '../popover/popper-helpers';
import { Calendar as CalendarIcon } from '../icons';
import { Input } from '../input';
import { colors } from '../shared-styles';
import { dateFunctionProps } from '../date-picker/date-function-props';
import { DatePicker } from '../date-picker/component';
import * as Styled from './styled';

/** Flexible date picker input (with support for many date parsing libraries) */
export class DatePickerInput extends PureComponent {
	static propTypes = {
		defaultSelectedDate: PropTypes.instanceOf(Date),
		/** Sets the selected date */
		selectedDate: PropTypes.instanceOf(Date),
		/** Functions that operate on a JS Date object.
		 * The following functions must be provided:
		 *
		 * startOfWeek, startOfMonth, endOfWeek, endOfMonth, getYear, getMonth, getDate, addWeeks, addMonths, subMonths, isBefore, format, isValid
		 *
		 * For details on how these functions should behave see the date-fns (v2) documentation https://date-fns.org
		 *
		 */
		dateFunctions: dateFunctionProps,
		/**
		 * parseUserDateString should be a function that takes a string and returns a js date. For example: https://www.npmjs.com/package/chrono-node (depends on momentjs)
		 */
		parseUserDateString: PropTypes.func.isRequired,
		validate: PropTypes.func,
		onBlur: PropTypes.func,
		onChange: PropTypes.func.isRequired,
		onFocus: PropTypes.func,
		disabled: PropTypes.bool,
		/** Where on the target the date picker renders */
		placement: PlacementOptionsProps,
		/** Style overrides, inputWidth is applied to the input */
		styleOverrides: PropTypes.shape({
			inputWidth: PropTypes.string,
			inputBorderColor: PropTypes.string,
			hideShadow: PropTypes.bool,
			width: PropTypes.string,
			padding: PropTypes.string,
			border: PropTypes.string,
			zIndex: PropTypes.number,
		}),
	};

	static defaultProps = {
		placement: 'bottom-start',
		styleOverrides: {
			inputWidth: '100%',
			padding: '16px 20px',
			zIndex: 3,
		},
	};

	constructor(props) {
		super(props);
		this.icon = React.createRef();

		this.state = {
			showCalendar: false,
			selectedDate: this.props.defaultSelectedDate,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.selectedDate && prevState.selectedDate !== nextProps.selectedDate) {
			return { ...prevState, selectedDate: nextProps.selectedDate };
		}
		return null;
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
		if (this.props.validate && !this.props.validate(selectedDate)) {
			return;
		}

		this.setState({ selectedDate, text: null, showCalendar: false });
		this.props.onChange(selectedDate);
	};

	handleTextChange = text => {
		this.setState({
			showCalendar: false,
			text,
		});

		const selectedDate = this.props.parseUserDateString(text);

		if (this.props.validate && !this.props.validate(selectedDate)) {
			return;
		}

		this.setState({ selectedDate });
		this.props.onChange(selectedDate);
	};

	handlePopoutClicked = event => event.nativeEvent.stopImmediatePropagation();

	renderCalendar = selectedDate => (
		<Styled.DateTime>
			<DatePicker
				selectedDate={selectedDate}
				setSelectedDate={this.handleChangeSelectedDate}
				validate={this.props.validate}
				dateFunctions={this.props.dateFunctions}
			/>
		</Styled.DateTime>
	);

	render() {
		const { disabled, defaultSelectedDate, placement, styleOverrides } = this.props;
		const { text, selectedDate, showCalendar } = this.state;

		const defaultValue = defaultSelectedDate ? this.formatDate(defaultSelectedDate) : '';
		const formattedDate = selectedDate ? this.formatDate(selectedDate) : defaultValue;
		const value = text !== null && text !== undefined ? text : formattedDate;
		const inputStyleOverrides = { width: styleOverrides.inputWidth };
		const popoverStyleOverrides = {
			hideShadow: styleOverrides.hideShadow,
			width: styleOverrides.width,
			padding: styleOverrides.padding,
			border: styleOverrides.border,
			zIndex: styleOverrides.zIndex,
		};

		return (
			<Styled.Container>
				<PopoverManager>
					<Input
						type="text"
						onBlur={this.handleBlur}
						onChange={this.handleChange}
						onFocus={this.handleFocus}
						value={value}
						disabled={disabled}
						borderColor={styleOverrides.inputBorderColor}
						styleOverrides={inputStyleOverrides}
					/>
					<Styled.CalendarButton ref={this.icon} onClick={!disabled ? this.openCalendar : null}>
						<Styled.CalendarIconContainer>
							<PopoverReference>
								<CalendarIcon style={{ color: colors.gray52 }} />
							</PopoverReference>
						</Styled.CalendarIconContainer>
					</Styled.CalendarButton>
					<Popover
						placement={placement}
						isOpen={showCalendar}
						styleOverrides={popoverStyleOverrides}
					>
						{/*eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
						<div onClick={this.handlePopoutClicked}>
							{this.renderCalendar(selectedDate || new Date())}
						</div>
					</Popover>
				</PopoverManager>
			</Styled.Container>
		);
	}
}

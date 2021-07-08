import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../../shared-hooks';
import { useKeyboardNav, useDateFunctions } from '../date-picker-utils';
import * as Styled from './styled';

export function DatePicker({
	dateFunctions,
	value,
	validate,
	minDate,
	maxDate,
	onChange,
	onClose,
}) {
	const dateFns = useDateFunctions(dateFunctions);
	const containerRef = useRef();
	const [currentDate, setCurrentDate] = useState(value ?? dateFns.todaysDate);
	const currentMonth = dateFns.getMonth(currentDate);
	const currentYear = dateFns.getYear(currentDate);

	useEffect(() => {
		if (dateFns.isValid(value) && !dateFns.isSameDay(value, currentDate)) {
			setCurrentDate(value);
		}
	}, [value, currentDate, dateFns]);

	const daysInMonthByWeek = useMemo(
		() => dateFns.getEachDayOfMonthByWeek(currentDate),
		[currentMonth, currentYear, dateFns], // eslint-disable-line react-hooks/exhaustive-deps
	);

	const handleSelectDate = useCallback(
		date => () => {
			onChange(date);
		},
		[onChange],
	);

	const { register } = useKeyboardNav({
		setCurrentDate,
		onCloseMenu: onClose,
		focusCatchRef: containerRef,
		dateFunctions,
	});
	const canGoPrev = !minDate || daysInMonthByWeek[0][0] > minDate;
	const canGoNext =
		!maxDate ||
		daysInMonthByWeek
			.slice(-1)
			.pop()
			.slice(-1)
			.pop();
	const headerId = `date-picker-header-${useId()}`;
	return (
		<Styled.Container aria-labelledby={headerId} ref={containerRef}>
			<Styled.HeaderContainer id={headerId}>
				<Styled.PrevButton
					aria-label="previous month"
					disabled={!canGoPrev}
					onClick={() => setCurrentDate(dateFns.getPrevMonth)}
				/>
				<Styled.Header>{dateFns.formatTitle(currentDate)}</Styled.Header>
				<Styled.NextButton
					aria-label="next month"
					disabled={!canGoNext}
					onClick={() => setCurrentDate(dateFns.getNextMonth)}
				/>
			</Styled.HeaderContainer>
			<Styled.DatesContainer aria-labelledby={headerId}>
				<Styled.DayHeaderRow>
					<tr>
						{Array.from(Array(7)).map((_, i) => (
							<Styled.DayHeader key={i} abbr={dateFns.getDOWName(i)}>
								{dateFns.getDOWName(i, dateFns.abbrv.narrow)}
							</Styled.DayHeader>
						))}
					</tr>
				</Styled.DayHeaderRow>
				<tbody>
					{daysInMonthByWeek.map((week, index) => (
						<Styled.Week key={`${currentMonth}-${currentYear}-${index}`}>
							{week.map((day, dIndex) => (
								<td key={`${currentMonth}-${index}-${dIndex}`}>
									<Styled.Day
										id={`${index}-${dIndex}`}
										{...register(currentMonth)}
										isToday={dateFns.isSameDay(day, dateFns.todaysDate)}
										isSelected={dateFns.isSameDay(day, value)}
										noSelection={!value}
										isCurrentDate={dateFns.isSameDay(day, currentDate)}
										autoFocus={dateFns.isSameDay(day, currentDate)}
										disabled={
											!dateFns.isSameMonth(day, currentDate) ||
											(validate && !validate(day)) ||
											(maxDate && day > maxDate) ||
											(minDate && day < minDate)
										}
										onClick={handleSelectDate(day)}
									>
										{dateFns.formatDay(day)}
									</Styled.Day>
								</td>
							))}
						</Styled.Week>
					))}
				</tbody>
			</Styled.DatesContainer>
		</Styled.Container>
	);
}

DatePicker.propTypes = {
	dateFunctions: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	value: PropTypes.instanceOf(Date),
	validate: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
};

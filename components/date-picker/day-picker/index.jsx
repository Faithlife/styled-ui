import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../../shared-hooks';
import { useDateFunctions, useDOWKeyboardNav } from '../date-picker-utils';
import * as Styled from './styled';

export function DayPicker({ dateFunctions, value, onChange, onClose }) {
	const dateFns = useDateFunctions(dateFunctions);
	const containerRef = useRef();
	const currentDOW = value ?? dateFns.getDayOfWeek(dateFns.todaysDate);

	const weekDayIndexArray = useMemo(() => dateFns.getWeekDayIndexArray(), [dateFns]);

	const { register } = useDOWKeyboardNav({
		onCloseMenu: onClose,
		focusCatchRef: containerRef,
	});
	const headerId = `day-picker-header-${useId()}`;
	return (
		<Styled.Container aria-labelledby={headerId} ref={containerRef}>
			<Styled.HeaderContainer id={headerId}>
				<Styled.Header>{dateFns.getDOWName(currentDOW)}</Styled.Header>
			</Styled.HeaderContainer>
			<Styled.DatesContainer aria-labelledby={headerId}>
				<Styled.DayHeaderRow>
					<tr>
						{Array.from(Array(7)).map((_, i) => (
							<Styled.DayHeader key={i}>{dateFns.getDOWName(i)}</Styled.DayHeader>
						))}
					</tr>
				</Styled.DayHeaderRow>
				<tbody>
					<tr>
						{weekDayIndexArray.map((dIndex, index) => (
							<td key={dIndex}>
								<Styled.Day
									id={`DOW-${index}`}
									{...register()}
									isToday={dIndex === dateFns.getDayOfWeek(dateFns.todaysDate)}
									isSelected={dIndex === value}
									noSelection={!value}
									autoFocus={dIndex === value}
									onClick={() => onChange(dIndex)}
								>
									{dateFns.getDOWName(dIndex, dateFns.abbrv.abbreviated)}
								</Styled.Day>
							</td>
						))}
					</tr>
				</tbody>
			</Styled.DatesContainer>
		</Styled.Container>
	);
}

DayPicker.propTypes = {
	dateFunctions: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	value: PropTypes.number,
	validate: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

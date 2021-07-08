import styled, { css } from 'styled-components';
import { Box } from '../../Box';
import { UtilityButton } from '../../button';
import { Text } from '../../Text';

export const Container = styled(Box).attrs({
	role: 'dialog',
	'aria-modal': 'true',
	tabIndex: -1,
})`
	width: 251px;

	&:focus {
		outline: none;
	}
`;

export const HeaderContainer = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	height: 32px;
`;

export const Header = styled(Text).attrs({
	as: 'h2',
	textStyle: 'ui.14',
	color: 'datePicker.primaryForeground',

	'aria-live': 'polite',
})``;

export const DatesContainer = styled(Box).attrs({
	as: 'table',
	role: 'grid',
	width: '100%',
})``;

export const DayHeaderRow = styled(Box).attrs({
	as: 'thead',
})``;

export const DayHeader = styled(Text).attrs({
	as: 'th',
	scope: 'col',

	textStyle: 'ui.12',
	color: 'datePicker.secondaryForeground',
})`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	width: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;

export const Week = styled(Box).attrs({
	as: 'tr',
})`
	display: 'flex';
	flex-direction: row;
	width: 100%;
`;

export const Day = styled(UtilityButton).attrs(({ isToday, isSelected, noSelection }) => ({
	...(isToday && { 'aria-current': 'date' }),
	...(isSelected && { 'aria-selected': 'true' }),
	tabIndex: isSelected || (isToday && noSelection) ? 0 : -1,
}))`
	cursor: pointer;
	width: 30px;
	height: 30px;
	position: relative;
	border-radius: 3px;

	${({ theme: { colors } }) => css`
		color: ${colors.datePicker.dayForeground};

		&:hover {
			background-color: ${colors.datePicker.dayHoverBackground};
		}

		&:disabled {
			color: ${colors.datePicker.dayDisabledForeground};
		}
	`}

	${({ isToday, theme: { colors } }) =>
		isToday
			? css`
					font-weight: 600;

					&::after {
						content: '';
						position: absolute;
						bottom: 2px;
						left: 13px;

						height: 4px;
						width: 4px;
						border-radius: 50%;

						background-color: ${colors.datePicker.selectedDayBackground};
					}
			  `
			: ''}

	${({ isSelected, theme: { colors } }) =>
		isSelected
			? css`
					color: ${colors.datePicker.selectedDayForeground};
					background-color: ${colors.datePicker.selectedDayBackground};

					&:hover {
						background-color: ${colors.datePicker.selectedDayHoverBackground};
					}

					&:disabled {
						color: ${colors.datePicker.selectedDayForeground};
					}
			  `
			: ''}
`;

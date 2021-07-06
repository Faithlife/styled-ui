import React from 'react';
import styled, { css } from 'styled-components';
import { Box } from '../Box';
import { Button, UtilityButton } from '../button';
import { Text } from '../Text';
import { CaretRight, CaretLeft } from '../icons/18px';

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
	justify-content: space-between;
	align-items: center;

	height: 32px;
`;

export const PrevButton = styled(Button).attrs({
	variant: 'minorTransparent',
	size: 'small',
	icon: <CaretLeft />,
})``;

export const NextButton = styled(Button).attrs({
	variant: 'minorTransparent',
	size: 'small',
	icon: <CaretRight />,
})``;

export const Header = styled(Text).attrs({
	as: 'h2',
	textStyle: 'ui.14',
	color: 'datePicker.primaryForeground',

	'aria-live': 'polite',
})``;

export const DatesContainer = styled(Box).attrs({
	as: 'table',
	role: 'grid',
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
	display: table-cell;
	position: relative;
	height: 30px;

	&:after {
		content: '';
		width: 34px;
		height: 1px;
		left: -2px;
		bottom: 0;
		position: absolute;

		background-color: ${({ theme }) => theme.colors.borderColor};
	}
`;

export const Week = styled(Box).attrs({
	as: 'tr',
})`
	display: 'flex';
	flex-direction: row;
	width: 100%;
`;

export const Day = styled(UtilityButton).attrs(
	({ isToday, isSelected, noSelection, isCurrentDate }) => ({
		...(isToday && { 'aria-current': 'date' }),
		...(isSelected && { 'aria-selected': 'true' }),
		tabIndex: isSelected || (isToday && noSelection) || isCurrentDate ? 0 : -1,
	}),
)`
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

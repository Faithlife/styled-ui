import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { common } from '../../theme/system';

export const Container = styled.div(common);

export const ChangeMonth = styled.button`
	display: flex;
	justify-content: space-around;
	align-items: center;
	border: none;
	margin: 0;
	padding: 0;
	height: 34px;
	width: 22px;
	background: none;
	cursor: pointer;

	&:focus {
		outline: ${({ visuallyDisabled }) =>
			visuallyDisabled && `${themeGet('colors.datePicker.disabledOutline')} auto 1px`};
	}
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	white-space: nowrap;
	border-bottom: none;
	background: ${themeGet('colors.datePicker.background')};
	color: ${themeGet('colors.datePicker.header')};
	line-height: 32px;
	font-weight: bold;
`;

export const MonthLabel = styled.div`
	display: inline-block;
`;

export const Week = styled.ul`
	display: flex;
	border-bottom: 1px solid ${themeGet('colors.datePicker.weekBorder')};
	padding: 8px 0;
	background: ${themeGet('colors.datePicker.background')};
	list-style: none;
	margin: 0;
	color: ${themeGet('colors.datePicker.week')};
	font-size: 12px;
`;

export const WeekDay = styled.li`
	flex: 1;
	text-align: center;
	text-transform: uppercase;
`;

export const Month = styled.div`
	background: ${themeGet('colors.datePicker.background')};
	font-size: 14px;

	@media (hover: none) {
		max-width: 308px;
	}
`;

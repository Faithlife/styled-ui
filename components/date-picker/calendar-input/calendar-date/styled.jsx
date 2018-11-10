import styled from 'styled-components';
import { colors } from '../../../shared-styles';

const calendarWeekDayCss = `
	flex: 1;
	position: relative;
	box-sizing: border-box;
	border-top: none;
	border-left: 1px solid ${colors.gray8};
	border-right: none;
	border-bottom: 1px solid ${colors.gray8};
	margin: 0;
	padding: 0;
	background: none;
	cursor: pointer;
	text-align: center;

	&:hover {
		background: ${colors.gray4};
	}

	&:focus {
		outline: none;
	}

	&:after {
		display: block;
		content: '';
		margin-top: 110%;
	}

	&:disabled {
		cursor: default;
		background: none;
	}

	&:first-of-type {
		border-left: none;
	}
`;

export const CalendarWeekDay = styled.div`
	${calendarWeekDayCss};
`;

export const CalendarWeekDaySelected = styled.button`
	${calendarWeekDayCss}
	background: ${colors.blueBase};
	color: @shade0;

	&:hover {
		background: ${colors.blueBase};
		color: @shade0;
	}
`;

export const CalendarWeekDayGrayedOut = styled.button`
	${calendarWeekDayCss}
	color: ${colors.gray34};
`;

export const CalendarMonthLabel = styled.div`
	position: absolute;
	top: 1px;
	left: 0;
	right: 0;
	text-transform: uppercase;
`;

export const CalendarDateLabel = styled.div`
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	transform: translateY(-50%);
`;

export const CalendarWeekDayCurrentDay = styled.div`
	display: block;
	position: absolute;
	bottom: 4%;
	right: 45%;
	border-radius: 4px;
	width: 4px;
	height: 4px;
	background: ${colors.blueBase};
`;

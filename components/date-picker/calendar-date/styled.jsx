import styled from 'styled-components';
import { colors } from '../../shared-styles';

export const CalendarWeekDayButton = styled.button`
	flex: 1;
	position: relative;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	background: none;
	cursor: pointer;
	text-align: center;
	border: none;

	@media (hover: hover) {
		height: 30px;
		width: 30px;
	}
	@media (hover: none) {
		height: 44px;
		width: 44px;
	}
`;

const calendarWeekDayCss = `
	width: 100%;
	height: 100%;

	&:hover {
		background: ${colors.gray4};
		transition: background 0.2s ease-out;
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		cursor: default;
		background: none;
	}
`;

export const CalendarWeekDay = styled.div`
	${calendarWeekDayCss};
`;

export const CalendarWeekDaySelected = styled.div`
	${calendarWeekDayCss}
	background: ${colors.blueBase};
	color: ${colors.white};
	border-radius: 2px;

	&:hover {
		background: ${colors.blueBase};
		color: ${colors.white};
	}
`;

export const CalendarWeekDayInRange = styled.div`
	${calendarWeekDayCss}
	background: ${colors.blueTint};
	border-radius: 0;

	&:hover {
		background: ${colors.blueLight};
		color: ${colors.white};
		transition: background 0.2s ease-out, color 0.2s ease-out;
	}
`;

export const CalendarWeekDayGrayedOut = styled.div`
	${calendarWeekDayCss}
	color: ${colors.gray22};
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

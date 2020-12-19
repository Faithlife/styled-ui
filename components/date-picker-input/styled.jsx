import styled from 'styled-components';
import { UtilityButton } from '../button';

export const Container = styled.div`
	display: inherit;
	flex-grow: 1;
	position: relative;
	${({ width }) => width && `width: ${width};`}
	max-width: 100%;
	min-width: 0;
	height: 32px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.flGray};
`;

export const CalendarButton = styled(UtilityButton).attrs(({ theme, color }) => ({
	color: color ?? theme.colors.datePickerInput.iconColor,
}))`
	position: absolute;
	top: 0;
	right: 0;
	padding: 7px 7px 7px 0;
	cursor: pointer;
`;

export const CalendarIconContainer = styled.div`
	height: 18px; /* matches CalendarIcon */
`;

export const DateTime = styled.div`
	width: 204px;
`;

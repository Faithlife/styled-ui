import styled from 'styled-components';
import { colors } from '../shared-styles';

export const Container = styled.div`
	display: inherit;
	flex-grow: 1;
	position: relative;
	max-width: 100%;
	min-width: 0;
	height: 32px;
	font-size: 14px;
	color: ${colors.flGray};
`;

export const CalendarButton = styled.div`
	position: absolute;
	top: 0;
	right: 7px;
	cursor: pointer;
`;

export const CalendarIconContainer = styled.div`
	padding: 7px 0;
`;

export const DateTime = styled.div`
	width: 204px;
`;

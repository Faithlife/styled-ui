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

export const Input = styled.input`
	font-size: 1rem;
	line-height: 1.3;
	font-family: inherit;
	border: 1px solid ${colors.borderColor};
	border-radius: 3px;
	height: 32px;
	width: 100%;
	margin: 0;
	padding: 0.25rem 0.5rem;
	transition: color 0.2s linear;
	box-sizing: border-box;
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

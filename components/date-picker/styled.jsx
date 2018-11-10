import styled from 'styled-components';
import { colors } from '../shared-styles';

export const container = styled.div`
	display: inherit;
	flex-grow: 1;
	position: relative;
	max-width: 100%;
	min-width: 0;
	height: 34px;
`;

export const input = styled.input`
	font-size: 1rem;
	line-height: 1.3;
	font-family: inherit;
	color: @font-color;
	border: 1px solid ${colors.borderColor};
	border-radius: 3px;
	height: 32px;
	width: 100%;
	margin: 0;
	padding: 0.25rem 0.5rem;
	transition: color 0.2s linear;
	box-sizing: border-box;
`;

export const calendarButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 45%;
	right: 5px;
	transform: translateY(-50%);
	height: 100%;
	cursor: pointer;
`;

export const calendarIconContainer = styled.div`
	padding: 0 8px;
`;

export const calendarPopout = styled.div`
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
	background-color: ${colors.gray4};
	z-index: 1;
	user-select: none;

	@media only screen and (max-width: 460px) {
		.calendar-popout {
			flex-wrap: wrap;
			left: unset;
			right: 0;
		}
	}
`;

export const dateTime = styled.div`
	width: 204px;
`;

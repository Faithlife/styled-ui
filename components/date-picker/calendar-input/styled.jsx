import styled from 'styled-components';
import { colors } from '../../shared-styles';

export const ChangeMonth = styled.button`
	display: flex;
	justify-content: space-around;
	border: none;
	margin: 0;
	padding: 0;
	height: 34px;
	width: 22px;
	background: none;
	cursor: pointer;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	white-space: nowrap;
	border-bottom: none;
	padding: 16px 8px;
	height: 44px;
	background: ${colors.white};
	line-height: 32px;
`;

export const MonthLabel = styled.div`
	display: inline-block;
`;

export const Week = styled.ul`
	display: flex;
	border-top: 1px solid ${colors.borderColor};
	border-bottom: 1px solid ${colors.borderColor};
	padding: 8px 0;
	background: ${colors.white};
	list-style: none;
	margin: 0;
`;

export const WeekDay = styled.li`
	flex: 1;
	text-align: center;
	text-transform: uppercase;
`;

export const Month = styled.div`
	background: ${colors.white};
`;

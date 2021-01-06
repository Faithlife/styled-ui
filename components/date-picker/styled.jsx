import styled from 'styled-components';
import { colors } from '../shared-styles';
import { common, typography } from '../../theme/system';

export const Container = styled.div(common, typography);

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
		outline: ${({ visuallyDisabled }) => visuallyDisabled && `${colors.gray22} auto 1px`};
	}
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	white-space: nowrap;
	border-bottom: none;
	background: ${colors.white};
	color: ${colors.gray66};
	line-height: 32px;
	font-weight: bold;
`;

export const MonthLabel = styled.div`
	display: inline-block;
`;

export const Week = styled.ul`
	display: flex;
	border-bottom: 1px solid ${colors.gray14};
	padding: 8px 0;
	background: ${colors.white};
	list-style: none;
	margin: 0;
	color: ${colors.gray22};
	font-size: 12px;
`;

export const WeekDay = styled.li`
	flex: 1;
	text-align: center;
	text-transform: uppercase;
`;

export const Month = styled.div`
	background: ${colors.white};
	font-size: 14px;

	@media (hover: none) {
		max-width: 308px;
	}
`;

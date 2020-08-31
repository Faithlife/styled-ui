import styled from 'styled-components';
import { colors, thickness } from '../../../components/shared-styles';

export const MenuItem = styled.div`
	display: flex;
	border-bottom: 1px solid ${colors.gray8};
	padding: ${thickness.eight};
	cursor: pointer;
	overflow: hidden;
`;

export const Avatar = styled.img`
	border-radius: 4px;
	width: 40px;
	height: 40px;
`;

export const GroupInfo = styled.div`
	flex: 1;
	margin-left: ${thickness.eight};
	overflow: hidden;
`;

export const GroupName = styled.div`
	font-weight: 600;
	font-size: 16px;
	color: ${colors.Black};
`;

export const GroupSubtitle = styled.div`
	color: ${colors.gray34};
	font-size: 14px;
	line-height: 20px;
`;

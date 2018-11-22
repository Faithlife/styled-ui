import styled from 'styled-components';
import { thickness, colors } from '../shared-styles';

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
`;

export const TableCell = styled.td`
	text-overflow: ellipsis;
	overflow: hidden;
	flex: 1;
`;

export const TableHeader = styled.thead`
	text-align: left;
`;

export const TableRow = styled.tr`
	display: flex;
	align-items: center;
	padding: ${thickness.twelve} ${thickness.sixteen};
	border-bottom: 1px solid ${colors.borderColor};
	align-items: normal;

	${props =>
		props.onClick
			? `cursor: pointer; &:hover, &:active, &:focus { background-color: ${colors.gray8} }`
			: ''};
`;

export const HeaderRow = styled.tr`
	display: flex;
	align-items: center;
	padding: ${thickness.twelve} ${thickness.sixteen};
	background-color: ${colors.gray4};
	border-width: 1px 0 1px 0;
	border-color: ${colors.borderColor};
	border-style: solid;
`;

export const Heading = styled.th`
	flex: 1;
	font-weight: 700;
`;

export const SortableHeading = styled.th`
	flex: 1;
	font-weight: 700;
	${props =>
		props.sortable
			? `cursor: pointer; &:hover, &:active, &:focus { background-color: ${colors.gray8} }`
			: ''};
`;

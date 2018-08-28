import styled from 'styled-components';
import { resetStyles } from '../utils';

export const CheckboxDiv = styled.div`
	position: absolute;
	border: solid 1px ${props => props.theme.border};
	border-radius: 3px;
	width: 14px;
	height: 14px;
	background: transparent;
`;

export const CheckboxContainer = styled.button`
	${resetStyles};

	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0;
	min-width: 16px;
	min-height: 16px;
	background: transparent;

	&:hover ${CheckboxDiv} {
		border: solid 1px ${props => props.theme.primary};
	}
`;

export const isCheckedStyles = `&:after {
opacity: 1;
}`;

export const CheckedIndicator = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 14px;
	height: 14px;
	cursor: pointer;

	&:after {
	background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%208%208'%3E%3Cpath%20fill='${props =>
		encodeURIComponent(
			props.theme.primary,
		)}'%20d='M6.564.75l-3.59%203.612-1.538-1.55L0%204.26%202.974%207.25%208%202.193z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		content: '';
		position: absolute;
		top: 1.5px;
		left: 1.5px;
		height: 9.6px;
		width: 9.6px;
		opacity: 0;
	}

	${props => (props.isChecked ? isCheckedStyles : '')};
`;

export const Label = styled.div`
	margin-left: 22px;

	& + & {
		margin-left: 6px;
	}
`;

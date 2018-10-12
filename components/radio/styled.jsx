import styled from 'styled-components';
import { resetStyles } from '../utils';

export const RadioDiv = styled.div`
	position: absolute;
	border: solid 1px ${props => props.theme.border};
	border-radius: 14px;
	width: 14px;
	height: 14px;
	background: transparent;
`;

export const RadioContainer = styled.button`
	${resetStyles};

	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0;
	min-width: 16px;
	min-height: 16px;
	background: transparent;

	&:hover ${RadioDiv} {
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
		background: ${props => props.theme.primary};
		content: '';
		position: absolute;
		top: 1.5px;
		left: 1.5px;
		border-radius: 8px;
		height: 8px;
		width: 8px;
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

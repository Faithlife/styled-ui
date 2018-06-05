import styled from 'styled-components';

export const CheckboxDiv = styled.div`
	*,
	*:after,
	*:before {
		box-sizing: border-box;
	}

	position: absolute;
	border: solid 1px ${props => props.theme.border};
	border-radius: 3px;
	width: 14px;
	height: 14px;
	background: transparent;
`;

export const CheckboxContainer = styled.button`
	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0;
	height: 16px;
	min-width: 0;
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
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		opacity: 0;
		transform: rotate(-45deg);
		border: 2px solid ${props => props.theme.primary};
		border-top: none;
		border-right: none;
		width: 9px;
		height: 5px;
		background: transparent;
	}

	${props => (props.isChecked ? isCheckedStyles : '')};
`;

export const Label = styled.div`
	margin-left: 22px;
`;

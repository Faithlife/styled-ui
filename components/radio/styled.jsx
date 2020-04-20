import styled from 'styled-components';
import { resetStyles } from '../utils';

export const RadioDiv = styled.div`
	position: absolute;
	border: solid 1px ${props => props.theme.border};
	border-radius: 14px;
	width: 14px;
	height: 14px;
	padding: 2px;
	background: transparent;

	${props =>
		props.disabled
			? `
		border: solid 1px ${props.theme.disabledBorder};
		background-color: ${props.theme.disabledBackground};
	`
			: ''}
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

	&:not(:disabled) {
		&:active {
			color: buttontext;
		}

		@media (hover: hover) {
			&:hover ${RadioDiv} {
				border: solid 1px ${props => props.theme.primary};
			}
		}
		@media (hover: none) {
			&:active ${RadioDiv} {
				border: solid 1px ${props => props.theme.primary};
			}
		}
	}

	&:focus {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
		outline: none;
	}
`;

export const isCheckedStyles = `&:after {
opacity: 1;
}`;

export const CheckedIndicator = styled.div`
	display: flex;
	height: 100%;
	cursor: pointer;

	${props => (props.disabled ? 'cursor: default;' : '')};

	&:after {
		flex: 1;
		background: ${props => props.theme.primary};
		content: '';
		border-radius: 50%;
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

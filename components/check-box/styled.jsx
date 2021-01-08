import styled, { css } from 'styled-components';
import { position, layout } from 'styled-system';
import { common } from '../../theme/system';
import { resetStyles } from '../utils';
import { Box } from '../Box';

export const CheckboxDiv = styled(Box)`
	display: inline;
	position: relative;
	border: solid 1px ${({ theme }) => theme.colors.checkbox.border};
	border-radius: 3px;
	width: 16px;
	height: 16px;
	background: ${({ theme }) => theme.colors.checkbox.background};

	${({ disabled, theme }) =>
		disabled &&
		`
			border: solid 1px ${theme.colors.checkbox.disabledBorder};
			background-color: ${theme.colors.checkbox.disabledBackground};
		`}

	${common}
	${position}
	${layout}
`;

export const CheckboxContainer = styled.button`
	${resetStyles}

	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0;
	min-height: 16px;
	min-width: 16px;
	background: transparent;
	text-align: unset;
	color: ${({ theme }) => theme.colors.foregroundPrimary};
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

	&:not(:disabled) {
		&:active {
			color: buttontext;
		}

		@media (hover: hover) {
			&:hover ${CheckboxDiv} {
				border: solid 1px ${({ theme }) => theme.colors.checkbox.primary};
			}
		}
		@media (hover: none) {
			&:active ${CheckboxDiv} {
				border: solid 1px ${({ theme }) => theme.colors.checkbox.primary};
			}
		}
	}

	&:focus {
		outline: none;

		& ${CheckboxDiv} {
			border-color: ${({ theme }) => theme.colors.checkbox.borderFocused};
			box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.checkbox.shadowFocused};
		}
	}

	${common}
`;

export const isCheckedStyles = css`
	&:after {
		background-repeat: no-repeat;
		content: '';
		position: absolute;
		top: 1px;
		left: 1px;
		bottom: 1px;
		right: 1px;
		opacity: 1;
	}
`;

export const isMixedStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;

	&:after {
		width: 10px;
		height: 2px;
		background: ${({ theme }) => theme.colors.checkbox.primary};
		content: '';
		opacity: 1;
	}
`;

export const CheckedIndicator = styled.div`
	width: 100%;
	height: 100%;

	&:after {
		background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%208%208'%3E%3Cpath%20fill='${props =>
			encodeURIComponent(
				props.theme.colors.checkbox.primary,
			)}'%20d='M6.564.75l-3.59%203.612-1.538-1.55L0%204.26%202.974%207.25%208%202.193z'/%3E%3C/svg%3E");
		color: ${({ theme }) => theme.colors.checkbox.primary};
		opacity: 0;
	}

	${({ isChecked }) => (isChecked === 'mixed' ? isMixedStyles : isChecked && isCheckedStyles)}
`;

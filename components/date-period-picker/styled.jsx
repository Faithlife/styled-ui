import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { common } from '../../theme/system';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	@media (hover: hover) {
		max-width: 250px;
	}
	@media (hover: none) {
		max-width: 324px;
	}

	padding: ${themeGet('space.2')} 0 ${themeGet('space.4')} 0;
	overflow: hidden;

	${common}
`;

export const DatePeriod = styled.div`
	${themeGet('textStyles.ui.14')}

	padding: ${themeGet('space.3')};
	background: ${themeGet('colors.datePeriodPicker.background')};
	cursor: pointer;
	width: 100%;
	box-sizing: border-box;
	text-align: initial;

	&:hover {
		background: ${themeGet('colors.datePeriodPicker.hoverBackground')};
		color: ${themeGet('colors.datePeriodPicker.hoverText')};
		transition: background 0.2s ease-out, color 0.2s ease-out;
	}
`;

export const DateInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	border-top: 1px solid ${themeGet('colors.datePeriodPicker.inputBorder')};
	padding: ${themeGet('space.4')} ${themeGet('space.3')};
`;

export const Label = styled.label`
	min-width: 0;
	text-align: initial;
	display: flex;
	flex-direction: column;

	${themeGet('textStyles.ui.14')}

	&:first-of-type {
		padding-right: ${themeGet('space.3')};
	}
`;

export const LabelText = styled.span`
	padding-bottom: ${themeGet('space.2')};
`;

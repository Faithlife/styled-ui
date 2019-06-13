import styled from 'styled-components';
import { colors, thickness, fonts } from '../shared-styles';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 324px;
	padding: ${thickness.four} 0 ${thickness.twelve} 0;
	overflow: hidden;
`;

export const DatePickerContainer = styled.div`
	padding: ${thickness.eight};
`;

export const DatePeriod = styled.div`
	font: ${fonts.ui14};
	padding: ${thickness.eight};
	background: ${colors.white};
	cursor: pointer;
	width: 100%;
	text-align: initial;

	&:hover {
		background: ${colors.blueBase};
		color: ${colors.white};
		transition: background 0.2s ease-out, color 0.2s ease-out;
	}
`;

export const DateInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	border-top: 1px solid ${colors.gray14};
	padding: ${thickness.twelve} ${thickness.eight};
`;

export const Label = styled.label`
	min-width: 0;
	text-align: initial;
	display: flex;
	flex-direction: column;
	font: ${fonts.ui14};

	&:first-of-type {
		padding-right: ${thickness.eight};
	}
`;

export const LabelText = styled.span`
	padding-bottom: ${thickness.four};
`;

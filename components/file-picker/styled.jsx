import styled from 'styled-components';
import { colors, thickness, fonts } from '../shared-styles';
import { resetStyles } from '../utils';

export const Container = styled.div`
	background: ${colors.white};
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: min-content 1fr;
	justify-content: stretch;
	align-items: stretch;
`;

export const DragDropText = styled.section`
	${fonts.ui18}
	color: ${colors.gray52};
	margin-top: ${thickness.twelve};
`;

export const DragDropContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: ${props => props.height};
`;

export const FileInputLabel = styled.section`
	input {
		display: none;
	}
`;

export const MinSizeLabel = styled.section`
	${fonts.ui16}
	color: ${colors.gray34};
	margin-top: ${thickness.twentyfour};
`;

export const BorderBox = styled.div`
	border: 2px solid ${colors.gray14};
	min-height: inherit;
	height: inherit;
	position: relative;
`;

export const ImageBox = styled.div`
	width: 180px;
	height: 180px;
	margin: ${thickness.eight};
`;

export const MultiSelectContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
	min-height: 444px;
`;

export const SingleSelectContainer = styled.div`
	overflow: hidden;
	min-height: 444px;
`;

export const Image = styled.img`
	max-height: 100%;
	max-width: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
`;

export const CloseButton = styled.button`
	${resetStyles};
	right: 4px;
	top: 2px;
	position: absolute;
	width: 30px;
	height: 30px;
	box-shadow: none;
	outline: none;
	background: ${colors.Black};
	opacity: 0.7;
	border: none;
	padding: 0;
	border-radius: 3px;

	&:hover {
		background: ${colors.gray66};
		cursor: pointer;
	}
`;

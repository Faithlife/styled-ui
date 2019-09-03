import styled from 'styled-components';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const Container = styled.div`
	width: 100%;
	height: 100%;
`;

export const Tab = styled.div`
	height: 532px;
`;

export const ButtonSection = styled.div`
	margin: 48px 11px;
`;

export const ButtonContainer = styled.div`
	float: right;
	padding: 8px 10px;
`;

export const DragDropText = styled.section`
	font-size: 18px;
	color: ${colors.gray52};
	margin-top: 12px;
`;

export const DragDropContainer = styled.div`
	text-align: center;
	height: ${props => props.height};
`;

export const FileInputLabel = styled.section`
	input {
		display: none;
	}
`;

export const MinSizeLabel = styled.section`
	font-size: 16px;
	color: ${colors.gray34};
	margin-top: 24px;
`;

export const SvgContainer = styled.div`
	margin-top: 109px;
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
	margin: 7px;
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

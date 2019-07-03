import styled from 'styled-components';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const Container = styled.div`
	background: ${colors.white};
	width: 800px;
	height: 600px;
`;

export const Title = styled.h1`
	font-size: 24px;
	color: ${colors.gray66};
	margin: 24px;
`;

export const Tab = styled.div`
	background: ${colors.white};
	height: 532px;
	width: 772px;
	margin: 8px;
`;

export const NativeContainer = styled.div`
	height: 400px;
	width: 732px;
	margin: 24px 24px 60px 24px;
`;

export const ButtonSection = styled.div`
	margin: 48px 11px;
`;

export const ButtonContainer = styled.div`
	float: right;
	padding: 8px 10px;
`;

export const DragDropText = styled.h2`
	font-size: 18px;
	color: ${colors.gray52};
	margin-top: 12px;
`;

export const DragDropSmallText = styled.h2`
	font-size: 16px;
	color: ${colors.gray52};
	margin-top: 12px;
`;

export const DragDropContainer = styled.div`
	text-align: center;
	height: ${props => props.height};
`;

export const FileInputLabel = styled.h3`
	input {
		display: none;
	}
`;

export const MinSizeLabel = styled.h3`
	font-size: 16px;
	color: ${colors.gray34};
	margin-top: 24px;
`;

export const SvgContainer = styled.div`
	margin-top: 109px;
`;

export const FileContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const DragDropBox = styled.div`
	height: 180px;
	width: 180px;
	border: 2px dashed ${colors.gray14};
	margin: 6px;
`;

export const FileBox = styled.div`
	height: 180px;
	width: 180px;
	border: 2px solid ${colors.gray14};
	margin: 6px;
`;

export const BorderBox = styled.div`
	border: 2px solid ${colors.gray14};
	width: inherit;
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
	height: 444px;
	width: 781px;
`;

export const SingleSelectContainer = styled.div`
	overflow: hidden;
	height: 444px;
	width: 781px;
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

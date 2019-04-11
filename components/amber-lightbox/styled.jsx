import styled from 'styled-components';
import { colors } from '../shared-styles';

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
	border-style: dashed;
	visibility: hidden;
`;

export const Iframe = styled.iframe`
	height: 394px;
	width: 752px;
	margin: 24px;
`;
export const NativeContainer = styled.div`
	height: 394px;
	width: 752px;
	margin: 24px;
`;

export const ButtonSection = styled.div`
	margin: 48px 16px;
`;

export const ButtonContainer = styled.div`
	float: right;
	padding: 8px;
`;

export const DragDropText = styled.h2`
	font-size: 18px;
	color: ${colors.gray52};
	margin-top: 12px;
`;

export const DragDropContainer = styled.div`
	height: 394px;
	width: 752px;
	text-align: center;
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

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
`;

export const Iframe = styled.iframe`
	height: 394px;
	width: 752px;
	margin: 24px;
`;

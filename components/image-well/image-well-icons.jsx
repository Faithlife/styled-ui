import styled from 'styled-components';
import { Camera as UnstyledCamera } from '../icons/18px';
import { X as UnstyledX } from '../icons/12px';

const IconContainerBase = styled.div`
	background-color: rgba(0, 0, 0, 0.3);
	position: absolute;
	top: 6px;
	right: 6px;
	cursor: pointer;
`;

export const RemoveIconContainer = styled(IconContainerBase)`
	width: 16px;
	height: 16px;
	padding: 3px;
	border-radius: 50%;
`;

export const CameraIconContainer = styled(IconContainerBase)`
	width: 20px;
	height: 20px;
	padding: 8px;
	border-radius: 6px;
`;

export const Camera = styled(UnstyledCamera)`
	margin-bottom: 8px;
`;

export const EditCamera = styled(Camera)`
	& path {
		fill: ${({ theme }) => theme.colors.gray4};
	}
`;

export const X = styled(UnstyledX)`
	& path {
		fill: ${({ theme }) => theme.colors.gray4};
	}
`;

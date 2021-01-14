import styled from 'styled-components';
import { Camera as UnstyledCamera } from '../icons/18px';
import { X as UnstyledX } from '../icons/12px';

const fixedContainerWidth = '116px';
const fixedContainerHeight = '116px';

export const WellContainer = styled.div`
	width: ${fixedContainerWidth};
	height: ${fixedContainerHeight};
`;

export const WellButton = styled.button`
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	color: ${({ theme }) => theme.colors.blue4};
	border: 2px dashed ${({ theme }) => theme.colors.gray34};
	border-radius: ${({ theme }) => theme.radii[2]};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	outline: none;
	cursor: pointer;

	/* use themeGet here? not sure these are actually working */
	font-size: ${({ theme }) => theme.fontSizes[3]};
	font-weight: ${({ theme }) => theme.fontWeights.regular};
	line-height: ${({ theme }) => theme.lineHeights[1]};

	&:hover {
		background-color: ${({ theme }) => theme.colors.blue1};
		border-color: ${({ theme }) => theme.colors.blue4};

		& svg path {
			fill: ${({ previewUrl, theme }) => (previewUrl ? '' : theme.colors.blue4)};
		}
	}
`;

export const WellPreview = styled.div`
	margin: 0;
	padding: 0;
	width: ${fixedContainerWidth};
	height: ${fixedContainerHeight};
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	border-radius: ${({ theme }) => theme.radii[2]};
	border: none;
`;

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

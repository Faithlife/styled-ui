import styled from 'styled-components';
import { border, color, layout, typography } from 'styled-system';
import { Box } from '../Box';
import { getBorderImage } from '../utils/get-border-image';

export const fixedContainerWidth = '116px';
export const fixedContainerHeight = '116px';

export const WellContainer = styled(Box)`
	width: ${fixedContainerWidth};
	height: ${fixedContainerHeight};

	${layout}
`;

export const WellButton = styled.button`
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	color: ${({ theme }) => theme.colors.blue4};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	outline: none;
	cursor: pointer;
	
	border: none;
	background-image: ${({ theme }) =>
		getBorderImage({ borderColor: theme.colors.gray34, borderRadius: theme.radii[2] })};
	border-radius: ${({ theme }) => theme.radii[2]};

	font-size: ${({ theme }) => theme.fontSizes[3]};
	font-weight: ${({ theme }) => theme.fontWeights.regular};
	line-height: ${({ theme }) => theme.lineHeights[1]};

	&:hover {
		background-color: ${({ theme }) => theme.colors.blue1};
		background-image: ${({ theme }) =>
			getBorderImage({ borderColor: theme.colors.blue4, borderRadius: theme.radii[2] })};

		& svg path {
			fill: ${({ previewUrl, theme }) => (previewUrl ? '' : theme.colors.blue4)};
		}
	}

	${border}
	${color}
	${typography}
`;

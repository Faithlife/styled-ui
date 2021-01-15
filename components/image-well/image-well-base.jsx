import styled from 'styled-components';
import { border, color, layout, typography } from 'styled-system';
import { Box } from '../Box';

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
	border: 2px dashed ${({ theme }) => theme.colors.gray34};
	border-radius: ${({ theme }) => theme.radii[2]};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	outline: none;
	cursor: pointer;

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

	${border}
	${color}
	${typography}
`;

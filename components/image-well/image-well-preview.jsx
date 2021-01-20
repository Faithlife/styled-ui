import styled from 'styled-components';
import { layout } from 'styled-system';
import { Box } from '../Box';
import { fixedContainerWidth, fixedContainerHeight } from './image-well-base';

export const WellPreview = styled(Box)`
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

	${layout}
`;

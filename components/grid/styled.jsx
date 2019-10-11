import styled from 'styled-components';

// Base Table
export const GridContainer = styled.div`
	height: ${({ height }) => height}px;
	${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}`};
	${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
`;

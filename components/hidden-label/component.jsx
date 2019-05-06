/**
 * This content will be always hidden from sighted users.
 * In cases where the function of an element is only visually apparent use this to explain via screen reader.
 * using styled suggested here: https://webaim.org/techniques/css/invisiblecontent/
 */

import styled from 'styled-components';

export const VisuallyHiddenLabel = styled.div`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	height: 1px;
	width: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;

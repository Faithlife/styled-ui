import styled, { css } from 'styled-components';
import { Box } from './Box';
import { theme } from '../theme';

export const ThemedBox = styled(Box)`
	${({ theme }) => css`
		div::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: ${theme.scrollbars.thumbBackground};
		}

		div::-webkit-scrollbar,
		div::-webkit-scrollbar-corner {
			background: ${theme.scrollbars.background};
		}

		div::-webkit-scrollbar {
			height: ${theme.scrollbars.width};
			width: ${theme.scrollbars.width};
		}

		@supports (scrollbar-color: #000 #000) {
			scrollbar-color: ${theme.scrollbars.thumbBackground} ${theme.scrollbars.background};
		}
	`}
`;

ThemedBox.defaultProps = {
	theme,
	color: 'foregroundPrimary',
};

import styled, { css } from 'styled-components';
import { Box } from './Box';
import { theme } from '../theme';

export const ThemedBox = styled(Box)``;

ThemedBox.defaultProps = {
	theme,
	color: 'foregroundPrimary',
	css: scrollbarCss,
};

export const scrollbarCss = ({ theme }) => css`
	div::-webkit-scrollbar-thumb {
		border-radius: 100px;
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
`;

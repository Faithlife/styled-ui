import styled, { css } from 'styled-components';
import { textStyle } from 'styled-system';
import { box, typography } from '../../theme/system';
import { theme } from '../../theme';

const UtilityButton = styled.button`
	font-family: inherit;
	background: transparent;
	border: none;
	padding: 0;
	color: inherit;
	cursor: ${x => x.cursor || (x.disabled ? 'default' : 'pointer')};
	outline: none;

	&.focus-visible {
		&:not(:active) {
			${({ theme }) => css`
				box-shadow: 0 0 0 2px ${theme.colors.button.focusShadow};
			`}
		}
	}

	&::-moz-focus-inner {
		border: 0;
	}

	&:disabled {
		pointer-events: none;
	}

	${box}
	${textStyle}
	${typography}
`;

UtilityButton.defaultProps = {
	theme,
};

export { UtilityButton };

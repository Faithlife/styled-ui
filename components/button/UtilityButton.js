import styled from 'styled-components';
import { box, typography } from '../../theme/system';
import { theme } from '../../theme';

const UtilityButton = styled.button`
	background: transparent;
	border: none;
	padding: 0;
	color: inherit;
	cursor: ${x => x.cursor || (x.disabled ? 'default' : 'pointer')};

	&:focus:not(.focus-visible) {
		outline: none;
	}

	&.focus-visible {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
	}

	&::-moz-focus-inner {
		border: 0;
	}

	${box}
	${typography}
`;

UtilityButton.defaultProps = {
	theme,
};

export { UtilityButton };

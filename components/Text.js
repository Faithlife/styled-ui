import styled from 'styled-components';
import { textStyle, layout, border } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { typography, common } from '../theme/system';
import { theme } from '../theme';

export const Text = styled.span`
	display: inline-flex;
	align-items: baseline;
	${themeGet('textStyles.c.16')};

	${textStyle};
	${common};
	${layout};
	${typography};
	${border};
`;

Text.defaultProps.theme = theme;

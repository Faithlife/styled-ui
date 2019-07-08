import styled from 'styled-components';
import { textStyle, space, color, layout, border } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { typography } from '../theme/system';

export const Text = styled.span`
	display: inline-flex;
	align-items: baseline;
	${themeGet('textStyles.c.16')};

	${textStyle};
	${space};
	${color};
	${layout};
	${typography};
	${border};
`;

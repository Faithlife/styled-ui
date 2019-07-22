import styled from 'styled-components';
import { textStyle, layout, border } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { typography, common } from '../theme/system';
import { theme } from '../theme';

export const Paragraph = styled.p`
	display: block;
	${themeGet('textStyles.c.16')};

	${textStyle};
	${common};
	${layout};
	${typography};
	${border};
`;

Paragraph.defaultProps = { theme };

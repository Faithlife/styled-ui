import PropTypes from 'prop-types';
import styled from 'styled-components';
import { textStyle } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { typography, box } from '../theme/system';
import { theme } from '../theme';

export const Paragraph = styled.p`
	display: block;
	margin: 0;
	color: ${themeGet('colors.gray66')};
	${themeGet('textStyles.c.16')};

	${textStyle};
	${box};
	${typography};
`;

Paragraph.defaultProps = { theme };
Paragraph.propTypes = {
	...box.propTypes,
	...typography.propTypes,
	textStyle: PropTypes.string,
};

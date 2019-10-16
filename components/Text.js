import PropTypes from 'prop-types';
import systemPropTypes from '@styled-system/prop-types';
import styled from 'styled-components';
import { textStyle, layout, border } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { typography, common } from '../theme/system';
import { theme } from '../theme';

export const Text = styled.span`
	display: inline-flex;
	align-items: baseline;
	color: ${themeGet('colors.gray66')};
	${themeGet('textStyles.c.16')};

	${textStyle};
	${common};
	${layout};
	${typography};
	${border};
`;

Text.defaultProps = { theme };
Text.propTypes = {
	...common.propTypes,
	...typography.propTypes,
	...systemPropTypes.layout,
	...systemPropTypes.border,
	textStyle: PropTypes.string,
};

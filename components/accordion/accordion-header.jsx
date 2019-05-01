import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled-header';

export function AccordionHeader({ children }) {
	return <Styled.AccordionHeader>{children}</Styled.AccordionHeader>;
}

AccordionHeader.propTypes = {
	children: PropTypes.node,
};

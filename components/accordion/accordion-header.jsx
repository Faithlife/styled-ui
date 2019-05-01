import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function AccordionHeader({ children }) {
	return <Styled.AccordionHeader>{children}</Styled.AccordionHeader>;
}

AccordionHeader.propTypes = {
	/** Children */
	children: PropTypes.node,
};

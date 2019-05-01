import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function AccordionPanel({ children }) {
	return <Styled.AccordionPanel>{children}</Styled.AccordionPanel>;
}

AccordionPanel.propTypes = {
	/** Children */
	children: PropTypes.node,
};

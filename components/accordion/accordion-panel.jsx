import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled-panel';

export function AccordionPanel({ children }) {
	return <Styled.AccordionPanel>{children}</Styled.AccordionPanel>;
}

AccordionPanel.propTypes = {
	children: PropTypes.node,
};

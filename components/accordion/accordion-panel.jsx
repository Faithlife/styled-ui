import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled-panel';

export function AccordionPanel({ children, className }) {
	return <Styled.AccordionPanel className={className}>{children}</Styled.AccordionPanel>;
}

AccordionPanel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

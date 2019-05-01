import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled-accordion';

export function Accordion({ children }) {
	return <Styled.Accordion>{children}</Styled.Accordion>;
}

Accordion.propTypes = {
	children: PropTypes.node,
};

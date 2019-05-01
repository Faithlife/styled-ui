import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function Accordion({ children }) {
	return <div>{children}</div>;
}

Accordion.propTypes = {
	/** Children */
	children: PropTypes.node,
};

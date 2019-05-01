import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function AccordionItem({ children }) {
	return <Styled.AccordionItem>{children}</Styled.AccordionItem>;
}

AccordionItem.propTypes = {
	/** Children */
	children: PropTypes.node,
};

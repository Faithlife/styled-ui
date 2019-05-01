import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled-item';

export function AccordionItem({ children }) {
	return <Styled.AccordionItem>{children}</Styled.AccordionItem>;
}

AccordionItem.propTypes = {
	children: PropTypes.node,
};

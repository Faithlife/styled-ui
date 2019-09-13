import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

/** Modal content, used within a parent Modal. Often used inside a render prop. */
export const ModalContent = ({ children, ...props }) => (
	<Styled.ModalContent {...props}>{children}</Styled.ModalContent>
);

ModalContent.propTypes = {
	children: PropTypes.node.isRequired,
};

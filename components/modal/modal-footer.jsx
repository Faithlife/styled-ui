import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

/** Modal footer, used within a parent Modal. Often used inside a render prop. */
export const ModalFooter = ({ children }) => <Styled.ModalFooter>{children}</Styled.ModalFooter>;

ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};

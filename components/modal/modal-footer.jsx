import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

const ModalFooter = ({ children }) => <Styled.ModalFooter>{children}</Styled.ModalFooter>;

export default ModalFooter;

ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};

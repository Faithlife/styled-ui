import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export const ModalFooter = ({ children }) => <Styled.ModalFooter>{children}</Styled.ModalFooter>;

ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};

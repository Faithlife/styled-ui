import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useModalSpacingContext } from './use-modal-spacing';

/** A flexible component built on styled-system primitives. */
export const ModalFooter = ({ children, ...props }) => {
	const modalSpacing = useModalSpacingContext();
	return (
		<Box display="flex" justifyContent="flex-end" width="100%" padding={modalSpacing} {...props}>
			{children}
		</Box>
	);
};

ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};

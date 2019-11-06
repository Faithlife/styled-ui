import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useModalContext } from './use-modal-context';

/** A flexible component built on styled-system primitives. */
export const ModalFooter = ({ children, ...props }) => {
	const { contentPadding } = useModalContext();
	return (
		<Box
			display="flex"
			justifyContent="flex-end"
			width="100%"
			padding={contentPadding}
			paddingTop={0}
			{...props}
		>
			{children}
		</Box>
	);
};

ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};

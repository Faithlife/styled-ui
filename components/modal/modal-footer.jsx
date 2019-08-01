import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

/** Modal footer, used within a parent Modal. Often used inside a render prop. */
export const ModalFooter = ({ children }) => (
	<Box display="flex" justifyContent="flex-end" marginTop={6} width="100%">
		{children}
	</Box>
);

ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};

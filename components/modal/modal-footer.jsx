import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

/** Modal footer, used within a parent Modal. Often used inside a render prop. */
export const ModalFooter = ({ children, ...props }) => (
	<Box display="flex" justifyContent="flex-end" width="100%" padding={6} paddingTop={0} {...props}>
		{children}
	</Box>
);

ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};

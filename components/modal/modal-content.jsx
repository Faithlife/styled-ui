import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

/** Modal content, used within a parent Modal. Often used inside a render prop. */
export const ModalContent = ({ children, ...props }) => (
	<Box
		maxWidth="100%"
		maxHeight="80%"
		overflowX="hidden"
		overflowY="auto"
		css={`
			overflow-wrap: break-word;
		`}
		{...props}
	>
		{children}
	</Box>
);

ModalContent.propTypes = {
	children: PropTypes.node.isRequired,
};

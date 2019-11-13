import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useModalContext } from './use-modal-context';

/** A flexible component built on styled-system primitives. */
export const ModalContent = ({ children, ...props }) => {
	const { contentPadding } = useModalContext();
	return (
		<Box
			maxWidth="100%"
			width={['100vw', 'auto']}
			css={`
				overflow-wrap: break-word;
			`}
			padding={contentPadding}
			overflowY="auto"
			{...props}
		>
			{children}
		</Box>
	);
};

ModalContent.propTypes = {
	children: PropTypes.node.isRequired,
};

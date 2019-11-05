import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useModalSpacingContext } from './use-modal-spacing';

/** A flexible component built on styled-system primitives. */
export const ModalContent = ({ children, ...props }) => {
	const modalSpacing = useModalSpacingContext();
	return (
		<Box
			maxWidth="100%"
			width={['100vw', 'auto']}
			css={`
				overflow-wrap: break-word;
			`}
			paddingX={modalSpacing}
			{...props}
		>
			{children}
		</Box>
	);
};

ModalContent.propTypes = {
	children: PropTypes.node.isRequired,
};

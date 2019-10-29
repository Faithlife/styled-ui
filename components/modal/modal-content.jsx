import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useModalSpacingContext } from './use-modal-spacing';

/** Modal content, used within a parent Modal. Often used inside a render prop. */
export const ModalContent = ({ children, ...props }) => {
	const modalSpacing = useModalSpacingContext();
	return (
		<Box
			maxWidth="100%"
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

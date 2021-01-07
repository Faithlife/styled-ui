import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { ThemedBox } from '../ThemedBox';
import { useModalContext } from './use-modal-context';

/** A flexible component built on styled-system primitives. */
export const ModalContent = ({ paddingY, maxHeight, children, ...props }) => {
	const { contentPadding } = useModalContext();
	return (
		<ThemedBox paddingY={paddingY ?? contentPadding} display="grid" minHeight={0}>
			<Box
				minHeight={0}
				maxWidth="100%"
				width={['100vw', 'auto']}
				css={`
					overflow-wrap: break-word;
				`}
				paddingX={contentPadding}
				overflowY="auto"
				{...props}
			>
				{children}
			</Box>
		</ThemedBox>
	);
};

ModalContent.propTypes = {
	children: PropTypes.node.isRequired,
};

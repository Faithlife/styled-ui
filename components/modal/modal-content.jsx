import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { ThemedBox } from '../ThemedBox';
import { useModalContext } from './use-modal-context';

/** A flexible component built on styled-system primitives. */
export const ModalContent = ({ paddingY, children, ...props }) => {
	const { contentPadding } = useModalContext();
	return (
		<ThemedBox paddingY={paddingY ?? contentPadding} overflow="hidden">
			<Box
				maxWidth="100%"
				width={['100vw', 'auto']}
				css={`
					overflow-wrap: break-word;
				`}
				paddingX={contentPadding}
				overflowY="auto"
				height="100%"
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

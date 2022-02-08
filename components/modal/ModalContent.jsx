import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { ThemedBox } from '../ThemedBox';
import { useModalContext } from './useModalContext';

/** A flexible component built on styled-system primitives. */
export const ModalContent = ({
	padding,
	paddingY,
	paddingTop,
	paddingBottom,
	paddingX,
	maxHeight,
	children,
	...props
}) => {
	const { contentPadding } = useModalContext();
	const paddingForTop = paddingTop ?? paddingY ?? padding ?? contentPadding;
	const paddingForBottom = paddingBottom ?? paddingY ?? padding ?? contentPadding;
	const paddingForX = paddingX ?? padding ?? contentPadding;
	return (
		<ThemedBox
			paddingTop={paddingForTop}
			paddingBottom={paddingForBottom}
			display="grid"
			minHeight={0}
		>
			<Box
				minHeight={0}
				maxWidth="100%"
				width={['100vw', 'auto']}
				css={`
					overflow-wrap: break-word;
				`}
				paddingX={paddingForX}
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

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Paragraph } from '../Paragraph';
import { UtilityButton } from '../button';
import { X as Close } from '../icons/18px';
import { useModalContext } from './use-modal-context';

/** A flexible component built on styled-system primitives. */
export const ModalHeader = ({ title, subtitle, message, actions, textStyle, ...props }) => {
	const { contentPadding, onClose } = useModalContext();
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			padding={contentPadding}
			paddingBottom={0}
			{...props}
		>
			<Stack spacing={3} width="100%">
				<Box display="flex" alignItems="baseline" overflow="hidden" width="100%">
					<Text
						display="block"
						textStyle={textStyle}
						color="gray66"
						whiteSpace="nowrap"
						overflow={['hidden', 'visible']}
						textOverflow="ellipsis"
					>
						{title}
					</Text>
					{message && (
						<Text
							display={['none', 'block']}
							textStyle={'c.13'}
							color="gray52"
							marginLeft={5}
							whiteSpace="nowrap"
							overflow="hidden"
							textOverflow="ellipsis"
						>
							{message}
						</Text>
					)}
					<Box display="grid" flex="1 0 auto" justifyContent="flex-end" marginLeft={5}>
						{actions ? (
							actions
						) : (
							<UtilityButton onClick={onClose} display="inline-grid">
								<Close />
							</UtilityButton>
						)}
					</Box>
				</Box>
				{subtitle && (
					<Box width="100%">
						<Paragraph width="100%" padding={0} textStyle="ui.14" textAlign="left" color="gray66">
							{subtitle}
						</Paragraph>
					</Box>
				)}
			</Stack>
		</Box>
	);
};

ModalHeader.propTypes = {
	/** Select a text style from our theme for the header title. */
	textStyle: PropTypes.string,
	title: PropTypes.node.isRequired,
	subtitle: PropTypes.node,
	/** Used for status updates, such as auto-saving. Not visible on mobile. */
	message: PropTypes.node,
	/** Can be used to render custom header action buttons. */
	actions: PropTypes.node,
};

ModalHeader.defaultProps = {
	textStyle: 'h.18',
};

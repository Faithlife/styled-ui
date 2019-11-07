import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Paragraph } from '../Paragraph';
import { Button } from '../button';
import { Close } from '../icons';
import { useModalContext } from './use-modal-context';

/** A flexible component built on styled-system primitives. */
export const ModalHeader = ({ title, subtitle, textStyle, ...props }) => {
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
				<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
					<Text textStyle={textStyle} color="gray66">
						{title}
					</Text>
					<Button variant="secondary" icon={<Close />} onClick={onClose} />
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
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
};

ModalHeader.defaultProps = {
	textStyle: 'h.18',
};

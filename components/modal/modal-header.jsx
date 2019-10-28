import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Text } from '../Text';
import { Paragraph } from '../Paragraph';
import { Button } from '../button';
import { Close } from '../icons';
import { useModalSpacingContext } from './use-modal-spacing';

export const ModalHeader = ({
	title,
	subtitle,
	onClose,
	headerBottomBorder,
	variant,
	...props
}) => {
	const modalSpacing = useModalSpacingContext();
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			padding={modalSpacing}
			{...props}
		>
			<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
				<Text textStyle={variant} color="gray66">
					{title}
				</Text>
				<Button variant="primaryTransparent" icon={<Close />} onClick={onClose} />
			</Box>
			{subtitle && (
				<Paragraph width="100%" paddingTop={3} textStyle="ui.14" textAlign="left" color="gray66">
					{subtitle}
				</Paragraph>
			)}
		</Box>
	);
};

ModalHeader.propTypes = {
	title: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	subtitle: PropTypes.string,
};

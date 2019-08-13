import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Text } from '../Text';
import { Button } from '../button';
import { Close } from '../icons';

export const ModalHeader = ({ title, subtitle, onClose, headerBottomBorder }) => (
	<Box
		display="flex"
		flexDirection="column"
		justifyContent="space-between"
		alignItems="center"
		width="100%"
		marginBottom={4}
		paddingBottom={5}
		borderBottom={headerBottomBorder ? headerBottomBorder : 1}
		borderColor="gray22"
	>
		<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
			<Text textStyle="h.24" color="gray66">
				{title}
			</Text>
			<Button primaryTransparent icon={<Close />} onClick={onClose} />
		</Box>
		{subtitle && (
			<Text width="100%" paddingTop={4} textStyle="ui.14" color="gray66">
				{subtitle}
			</Text>
		)}
	</Box>
);

ModalHeader.propTypes = {
	title: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	subtitle: PropTypes.string,
};

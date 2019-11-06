import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Box } from '../Box';
import { Button } from '../button';
import { ModalBackdrop } from '../modal-backdrop';
import { Close } from '../icons';
import { usePortalContainer } from '../shared-hooks/usePortalContainer';

/**
 * Simple modal with just a close icon and no padding. For a standardized modal layout, please see: Modal
 */
export const SimpleModal = ({
	isOpen,
	onClose,
	children,
	container: containerProp,
	zIndex,
	theme,
	...props
}) => {
	const container = usePortalContainer(containerProp);

	if (!isOpen) {
		return null;
	}

	const modal = (
		<ModalBackdrop onClose={onClose} zIndex={zIndex}>
			<Box
				display="flex"
				position="relative"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				margin="auto"
				width="fit-content"
				height="fit-content"
				maxHeight={['calc(100% - 16px)', null, '80%']}
				borderRadius={1}
				backgroundColor={(theme && theme.background) || 'white'}
				{...props}
			>
				<Box position="absolute" top={24} right={24} cursor="pointer" zIndex={200}>
					<Button variant="minorTransparent" icon={<Close />} onClick={onClose} />
				</Box>
				{children}
			</Box>
		</ModalBackdrop>
	);

	if (container) {
		return createPortal(modal, container);
	}

	return modal;
};

SimpleModal.propTypes = {
	/** controls state of modal */
	isOpen: PropTypes.bool.isRequired,
	/** Callback function for when the modal is close  */
	onClose: PropTypes.func.isRequired,
	/** Contents of the modal */
	children: PropTypes.node.isRequired,
	/** Will apply to the Modal Backdrop. */
	zIndex: PropTypes.number,
	/** Set to 'body' to attach the modal to body, otherwise will attach as a child element */
	container: PropTypes.string,
};

SimpleModal.defaultProps = {
	zIndex: 1050,
};

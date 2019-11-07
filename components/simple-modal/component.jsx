import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal';
import { Box } from '../Box';
import { Button } from '../button';
import { Close } from '../icons';

/**
 * Simple modal with just a close icon and no padding. For a standardized modal layout, please see: Modal
 */
export const SimpleModal = React.forwardRef(({ children, onClose, ...props }, ref) => (
	<Modal ref={ref} onClose={onClose} position="relative" {...props}>
		<Box position="absolute" top={24} right={24} cursor="pointer" zIndex={200}>
			<Button variant="minorTransparent" icon={<Close />} onClick={onClose} />
		</Box>
		{children}
	</Modal>
));

SimpleModal.displayName = 'SimpleModal';

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

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { ModalFooterButton } from './ModalFooterButton';

/** A helper component intended for use inside a <Modal.Footer>. Matches the shape of the v5 Modal "footerProps". */
export const ModalFooterButtons = ({ commitButton, cancelButton, deleteButton }) => {
	return (
		<Box
			display="flex"
			gap={5}
			flexDirection="row-reverse"
			justifyContent="flex-start"
			alignItems="center"
			width="100%"
		>
			{commitButton && (
				<ModalFooterButton
					variant="primary"
					onClick={commitButton.onClick}
					disabled={commitButton.disabled}
				>
					{commitButton.text}
				</ModalFooterButton>
			)}
			{cancelButton && (
				<ModalFooterButton
					variant="secondary"
					onClick={cancelButton.onClick}
					disabled={cancelButton.disabled}
				>
					{cancelButton.text}
				</ModalFooterButton>
			)}
			{deleteButton && (
				<ModalFooterButton
					variant="danger"
					onClick={deleteButton.onClick}
					disabled={deleteButton.disabled}
					floatAcross
				>
					{deleteButton.text}
				</ModalFooterButton>
			)}
		</Box>
	);
};

ModalFooterButtons.propTypes = {
	commitButton: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
	}),
	cancelButton: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
	}),
	deleteButton: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
	}),
};

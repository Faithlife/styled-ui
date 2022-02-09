import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Button } from '../button';

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
				<Button
					variant="primary"
					size={['medium', 'small']}
					onClick={commitButton.onClick}
					disabled={commitButton.disabled}
					paddingInline={[4, '10px']}
				>
					{commitButton.text}
				</Button>
			)}
			{cancelButton && (
				<Button
					variant="secondary"
					size={['medium', 'small']}
					onClick={cancelButton.onClick}
					disabled={cancelButton.disabled}
					paddingInline={[4, '10px']}
				>
					{cancelButton.text}
				</Button>
			)}
			{deleteButton && (
				<Button
					variant="danger"
					size={['medium', 'small']}
					onClick={deleteButton.onClick}
					disabled={deleteButton.disabled}
					paddingInline={[4, '10px']}
					marginInlineEnd="auto"
				>
					{deleteButton.text}
				</Button>
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

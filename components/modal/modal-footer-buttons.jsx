import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Button } from '../button';
import { useModalContext } from './use-modal-context';

/** A helper component intended for use inside a <Modal.Footer>. Matches the shape of the v5 Modal "footerProps". */
export const ModalFooterButtons = ({ commitButton, cancelButton, deleteButton }) => {
	const { modalWidth } = useModalContext();
	const hasThreeButtons = !!(commitButton && cancelButton && deleteButton);
	const useFullWidthButtons = hasThreeButtons ? modalWidth < 320 : modalWidth < 220;
	return (
		<Box
			display="flex"
			flexDirection={useFullWidthButtons ? 'column-reverse' : 'row-reverse'}
			justifyContent="flex-start"
			alignItems="center"
			width="100%"
		>
			{commitButton && (
				<Button
					variant="primary"
					size="medium"
					onClick={commitButton.onClick}
					width={useFullWidthButtons ? '100%' : null}
					disabled={commitButton.disabled}
				>
					{commitButton.text}
				</Button>
			)}
			{cancelButton && (
				<Box
					width={useFullWidthButtons ? '100%' : null}
					marginBottom={useFullWidthButtons ? 5 : null}
					marginRight={useFullWidthButtons ? null : 5}
				>
					<Button
						variant="secondary"
						size="medium"
						onClick={cancelButton.onClick}
						width={useFullWidthButtons ? '100%' : null}
						disabled={cancelButton.disabled}
					>
						{cancelButton.text}
					</Button>
				</Box>
			)}
			{deleteButton && (
				<Box
					width={useFullWidthButtons ? '100%' : null}
					marginBottom={useFullWidthButtons ? 5 : null}
					marginRight={useFullWidthButtons ? null : 'auto'}
				>
					<Button
						variant="danger"
						size="medium"
						onClick={deleteButton.onClick}
						width={useFullWidthButtons ? '100%' : null}
						disabled={deleteButton.disabled}
					>
						{deleteButton.text}
					</Button>
				</Box>
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

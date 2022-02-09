import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Button } from '../button';
import { useModalContext } from './useModalContext';

/** A helper component intended for use inside a <Modal.Footer>. Matches the shape of the v5 Modal "footerProps". */
export const ModalFooterButtons = ({ commitButton, cancelButton, deleteButton }) => {
	const { modalWidth } = useModalContext();
	const hasThreeButtons = !!(commitButton && cancelButton && deleteButton);
	const useFullWidthButtons = hasThreeButtons ? modalWidth < 320 : modalWidth < 220;
	return (
		<Box
			display="flex"
			gap={5}
			flexDirection={useFullWidthButtons ? 'column-reverse' : 'row-reverse'}
			justifyContent="flex-start"
			alignItems="center"
			width="100%"
		>
			{commitButton && (
				<Button
					variant="primary"
					size={['medium', 'small']}
					onClick={commitButton.onClick}
					width={useFullWidthButtons ? '100%' : null}
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
					width={useFullWidthButtons ? '100%' : null}
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
					width={useFullWidthButtons ? '100%' : null}
					disabled={deleteButton.disabled}
					paddingInline={[4, '10px']}
					marginInlineEnd={useFullWidthButtons ? null : 'auto'}
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

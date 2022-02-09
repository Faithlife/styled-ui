import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { ModalFooterButton } from './ModalFooterButton';

/** A helper component intended for use inside a <Modal.Footer>. Matches the shape of the v5 Modal "footerProps". */
export const ModalFooterButtons = ({ commitButton, cancelButton, deleteButton }) => {
	const buttons = [];
	if (commitButton) {
		buttons.push(<LegacyFooterButton key="commit" buttonObject={commitButton} variant="primary" />);
		if (cancelButton) {
			buttons.push(
				<LegacyFooterButton key="cancel" buttonObject={cancelButton} variant="secondary" />,
			);
		}
		if (deleteButton) {
			buttons.push(
				<LegacyFooterButton
					key="delete"
					buttonObject={deleteButton}
					variant="danger"
					floatAcross
				/>,
			);
		}
	} else {
		if (deleteButton) {
			buttons.push(
				<LegacyFooterButton key="delete" buttonObject={deleteButton} variant="dangerSpecial" />,
			);
		}
		if (cancelButton) {
			buttons.push(
				<LegacyFooterButton key="cancel" buttonObject={cancelButton} variant="secondary" />,
			);
		}
	}

	return (
		<Box
			display="flex"
			gap={5}
			flexDirection="row-reverse"
			justifyContent="flex-start"
			alignItems="center"
			width="100%"
		>
			{buttons}
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

const LegacyFooterButton = ({ buttonObject, variant, floatAcross = false }) => (
	<ModalFooterButton
		variant={variant}
		onClick={buttonObject.onClick}
		disabled={buttonObject.disabled}
		floatAcross={floatAcross}
	>
		{buttonObject.text}
	</ModalFooterButton>
);

LegacyFooterButton.propTypes = {
	buttonObject: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
	}).isRequired,
	variant: ModalFooterButton.propTypes.variant,
	floatAcross: PropTypes.bool,
};

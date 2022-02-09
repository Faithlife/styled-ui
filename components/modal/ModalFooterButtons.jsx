import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { ModalFooterButton } from './ModalFooterButton';
import { deprecateProp } from '../utils';

/** A helper component intended for use inside a `Modal.Footer`. */
export const ModalFooterButtons = ({ children, commitButton, cancelButton, deleteButton }) => {
	deprecateProp(
		commitButton,
		'The `commitButton` prop has been deprecated in favor of using `Modal.FooterButton` children. See the docs page for our current pattern: https://faithlife.github.io/styled-ui/#/modal',
	);
	deprecateProp(
		cancelButton,
		'The `cancelButton` prop has been deprecated in favor of using `Modal.FooterButton` children. See the docs page for our current pattern: https://faithlife.github.io/styled-ui/#/modal',
	);
	deprecateProp(
		deleteButton,
		'The `deleteButton` prop has been deprecated in favor of using `Modal.FooterButton` children. See the docs page for our current pattern: https://faithlife.github.io/styled-ui/#/modal',
	);

	if ((commitButton || cancelButton || deleteButton) && children) {
		throw new Error(
			'`children` cannot be used with `commitButton`, `cancelButton`, or `deleteButton`.',
		);
	}

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
			{children || buttons}
		</Box>
	);
};

ModalFooterButtons.propTypes = {
	children: PropTypes.node,
	/** @deprecated */
	commitButton: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
	}),
	/** @deprecated */
	cancelButton: PropTypes.shape({
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
	}),
	/** @deprecated */
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

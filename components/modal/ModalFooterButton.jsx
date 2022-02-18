import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';

/** A `Button` with size and padding defaults that conform to our modal footer design specs. */
export function ModalFooterButton({ floatAcross = false, ...props }) {
	return (
		<Button
			size={['medium', 'small']}
			paddingInline={[4, '10px']}
			marginInlineEnd={floatAcross ? 'auto' : null}
			{...props}
		/>
	);
}

ModalFooterButton.propTypes = {
	...Button.propTypes,
	/**
	 * Floats this button (and all after it) to the opposite side of the modal footer (the left side, for left-to-right
	 * languages).
	 */
	floatAcross: PropTypes.bool,
};

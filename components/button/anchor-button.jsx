import React from 'react';
import PropTypes from 'prop-types';
import { filterChildProps } from '../utils';
import { BaseButton } from './base-button';
import { baseButtonProps } from './button-utils';

/** Standard button with transition styles */
export function AnchorButton(props) {
	const [{ disabled, ...buttonProps }, baseProps] = filterChildProps(props, baseButtonProps);
	return <BaseButton disabled={disabled} as="a" {...baseProps} {...buttonProps} />;
}

AnchorButton.propTypes = {
	...BaseButton.propTypes,
	/** The destination the AnchorButton should link to. */
	href: PropTypes.string,
	/** This should only be used as a last resort if Theme and StyleOverrides will not do what you need */
	className: PropTypes.string,
};

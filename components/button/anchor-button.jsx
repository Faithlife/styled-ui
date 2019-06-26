import React from 'react';
import PropTypes from 'prop-types';
import { filterChildProps } from '../utils';
import { Button } from './component';
import { buttonProps } from './button-utils';

/** Standard button with transition styles */
export function AnchorButton(props) {
	const [{ disabled, ...anchorProps }, baseProps] = filterChildProps(props, buttonProps);
	let makeDisabled = null;
	if (disabled) {
		makeDisabled = e => {
			e.preventDefault();
		};
	}
	return (
		<Button disabled={disabled} onClick={makeDisabled} as="a" {...baseProps} {...anchorProps} />
	);
}

AnchorButton.propTypes = {
	...Button.propTypes,
	/** The destination the AnchorButton should link to. */
	href: PropTypes.string,
	/** This should only be used as a last resort if Theme and StyleOverrides will not do what you need */
	className: PropTypes.string,
};

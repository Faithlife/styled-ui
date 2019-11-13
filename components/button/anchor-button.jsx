import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './LegacyButton';

/** Standard button with transition styles */
const AnchorButton = React.forwardRef(function AnchorButton(props, ref) {
	const { disabled, ...otherProps } = props;
	let makeDisabled = null;
	if (disabled) {
		makeDisabled = e => {
			e.preventDefault();
		};
	}
	return <Button ref={ref} disabled={disabled} onClick={makeDisabled} as="a" {...otherProps} />;
});

AnchorButton.propTypes = {
	...Button.propTypes,
	/** The destination the AnchorButton should link to. */
	href: PropTypes.string,
	className: PropTypes.string,
};

export { AnchorButton };

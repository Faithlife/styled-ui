import React from 'react';
import PropTypes from 'prop-types';
import { usefilteredChildProps } from '../shared-hooks';
import * as Styled from './styled';
import { BaseButton } from './base-button';

/** Standard button with transition styles */
export const Button = React.forwardRef((props, ref) => {
	const [buttonProps, baseProps] = usefilteredChildProps(props, BaseButton.propTypes);

	return (
		<Styled.Button ref={ref} {...buttonProps}>
			<BaseButton {...baseProps} />
		</Styled.Button>
	);
});

Button.propTypes = {
	...BaseButton.propTypes,
	/** The type of button (for instance, submit) */
	type: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
};

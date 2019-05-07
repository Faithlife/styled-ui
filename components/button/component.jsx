import React from 'react';
import PropTypes from 'prop-types';
import { filterChildProps } from '../utils';
import { BaseButton, baseButtonProps } from './base-button';
import * as Styled from './styled';

/** Standard button with transition styles */
export const Button = React.forwardRef((props, ref) => {
	const [buttonProps, baseProps] = filterChildProps(props, baseButtonProps);

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
	/** See the docs for how to override styles properly */
	className: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
};

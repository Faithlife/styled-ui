import React from 'react';
import PropTypes from 'prop-types';
import { filterChildProps } from '../utils';
import { BaseButton, baseButtonProps } from './base-button';
import * as Styled from './styled';

/** Standard button with transition styles */
export const AnchorButton = React.forwardRef((props, ref) => {
	const [buttonProps, baseProps] = filterChildProps(props, baseButtonProps);

	return (
		<Styled.Button as="a" ref={ref} {...buttonProps}>
			<BaseButton {...baseProps} />
		</Styled.Button>
	);
});

AnchorButton.propTypes = {
	...BaseButton.propTypes,
	/** The destination the AnchorButton should link to. */
	href: PropTypes.string,
	/** See the docs for how to override styles properly */
	className: PropTypes.string,
};

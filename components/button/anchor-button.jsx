import React from 'react';
import PropTypes from 'prop-types';
import { usefilteredChildProps } from '../shared-hooks';
import { BaseButton } from './base-button';
import * as Styled from './styled';

/** Standard anchor styled as a button. Use this instead of a button if you are linking to another page. */
export const AnchorButton = React.forwardRef((props, ref) => {
	const [buttonProps, baseProps] = usefilteredChildProps(props, BaseButton.propTypes);

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
};

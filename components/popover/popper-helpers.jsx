import React from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference } from 'react-popper';
import * as Styled from './styled';

/** Popover reference container from react-popper */
export const PopoverReference = ({ children }) => (
	<Reference>
		{({ ref }) => <Styled.ReferenceContainer innerRef={ref}>{children}</Styled.ReferenceContainer>}
	</Reference>
);

PopoverReference.propTypes = {
	children: PropTypes.node,
};

/** Popover manager from react-popper */
export const PopoverManager = Manager;

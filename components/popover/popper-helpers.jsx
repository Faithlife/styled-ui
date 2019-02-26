import React from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference } from 'react-popper';
import * as Styled from './styled';

/** Popover reference container from react-popper */
export const PopoverReference = ({ children, ...referenceProps }) => (
	<Reference>
		{({ ref }) => (
			<Styled.ReferenceContainer {...referenceProps} ref={ref}>
				{children}
			</Styled.ReferenceContainer>
		)}
	</Reference>
);

PopoverReference.propTypes = {
	children: PropTypes.node,
};

/** Popover manager from react-popper */
export const PopoverManager = Manager;
export const PlainPopoverReference = Reference;
export const PlacementOptionsProps = PropTypes.oneOf([
	'top',
	'top-start',
	'top-end',
	'right',
	'right-start',
	'right-end',
	'bottom',
	'bottom-start',
	'bottom-end',
	'left',
	'left-start',
	'left-end',
]);

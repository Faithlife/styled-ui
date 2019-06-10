import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference } from 'react-popper';
import { useAddInboundsElement } from '../shared-hooks';
import * as Styled from './styled';

export const PopoverContext = React.createContext();

export function usePopoverContext() {
	const popoverContext = useContext(PopoverContext);

	return popoverContext;
}

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

export function FocusHandlerInboundsElement({ children }) {
	const { addInboundsElement, removeInboundsElement } = usePopoverContext();
	const targetRef = useAddInboundsElement(addInboundsElement, removeInboundsElement);

	return (
		<div ref={targetRef} tabIndex="-1">
			{children}
		</div>
	);
}

FocusHandlerInboundsElement.propTypes = {
	children: PropTypes.node.isRequired,
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

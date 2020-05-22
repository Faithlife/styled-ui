import React from 'react';
import PropTypes from 'prop-types';
import { Reference } from 'react-popper';
import { Box } from '../Box';

export const PopoverContext = React.createContext();

/** Popover reference container from react-popper */
export const PopoverReference = ({ children, ...referenceProps }) => (
	<Reference>
		{({ ref }) =>
			typeof children === 'function' ? (
				children({ ref, ...referenceProps })
			) : (
				<Box display="inline-block" {...referenceProps} ref={ref}>
					{children}
				</Box>
			)
		}
	</Reference>
);

PopoverReference.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

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

export const arrowWidth = '10px';
export const maxWidth = '1000px';
export const maxHeight = '1000px';

export const margins = {
	top: { marginBottom: arrowWidth },
	right: { marginLeft: arrowWidth },
	left: { marginRight: arrowWidth },
	bottom: { marginTop: arrowWidth },
};

export const getPlacement = placement => {
	if (!placement) {
		return 'top';
	}
	return placement.split('-')[0];
};

export const arrowStyles = {
	top: `
		top: 100%;

		&::after {
			top: 0;
		}
	`,
	right: `
		right: 100%;

		&::after {
			top: 50%;
			left: 100%;
		}
	`,
	left: `
		left: 100%;

		&::after {
			top: 50%;
			left: 0;
		}
	`,
	bottom: `
		bottom: 100%;

		&::after {
			top: 100%;
		}
	`,
};

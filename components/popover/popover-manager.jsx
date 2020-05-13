import React from 'react';
import PropTypes from 'prop-types';
import { Manager } from 'react-popper';
import { useFocusAwayHandler } from '../shared-hooks';
import { PopoverContext } from './popper-helpers';

export function PopoverManager({ children, onFocusAway, ...props }) {
	const targetRef = useFocusAwayHandler(onFocusAway);
	return (
		<Manager>
			<PopoverContext.Provider value={{ targetRef }}>{children}</PopoverContext.Provider>
		</Manager>
	);
}

PopoverManager.propTypes = {
	children: PropTypes.node.isRequired,
	/** Per spec, this should always be used to support closing on click away. */
	onFocusAway: PropTypes.func,
};

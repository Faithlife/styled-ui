import React from 'react';
import PropTypes from 'prop-types';
import { Manager } from 'react-popper';
import { useFocusAwayHandler } from '../shared-hooks';
import { PopoverContext } from './popper-helpers';

export function PopoverManager({ children, onFocusAway }) {
	const { targetRef, addInboundsElement, removeInboundsElement } = useFocusAwayHandler(onFocusAway);
	return (
		<Manager>
			<PopoverContext.Provider value={{ addInboundsElement, removeInboundsElement }}>
				<div tabIndex="-1" ref={targetRef}>
					{children}
				</div>
			</PopoverContext.Provider>
		</Manager>
	);
}

PopoverManager.propTypes = {
	children: PropTypes.node.isRequired,
	onFocusAway: PropTypes.func,
};

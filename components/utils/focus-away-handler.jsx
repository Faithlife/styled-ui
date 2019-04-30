import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFocusAwayHandler } from '../shared-hooks';

export function FocusAwayHandler({ children, onFocusAway }) {
	if (!onFocusAway) {
		return children;
	}

	const targetRef = useFocusAwayHandler(onFocusAway);

	useEffect(
		() => {
			if (onFocusAway && targetRef.current) {
				targetRef.current.focus();
			}
		},
		[onFocusAway, targetRef.current],
	);

	return (
		<div tabIndex="-1" ref={targetRef}>
			{children}
		</div>
	);
}

FocusAwayHandler.propTypes = {
	children: PropTypes.node.isRequired,
	onFocusAway: PropTypes.func,
};

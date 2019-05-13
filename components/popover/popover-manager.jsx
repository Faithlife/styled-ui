import React from 'react';
import PropTypes from 'prop-types';
import { Manager } from 'react-popper';
import { useFocusAwayHandler } from '../shared-hooks';
import { PopoverContext } from './popper-helpers';
import * as Styled from './styled';

export function PopoverManager({ children, onFocusAway }) {
	const { targetRef, addInboundsElement, removeInboundsElement } = useFocusAwayHandler(onFocusAway);
	return (
		<Manager>
			<PopoverContext.Provider value={{ addInboundsElement, removeInboundsElement }}>
				{onFocusAway ? (
					<Styled.FocusCatcher ref={targetRef}>{children}</Styled.FocusCatcher>
				) : (
					children
				)}
			</PopoverContext.Provider>
		</Manager>
	);
}

PopoverManager.propTypes = {
	children: PropTypes.node.isRequired,
	onFocusAway: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Manager } from 'react-popper';
import { useFocusAwayHandler } from '../shared-hooks';
import { Box } from '../Box';
import { PopoverContext } from './popper-helpers';

export function PopoverManager({ children, onFocusAway }) {
	const { targetRef, addInboundsElement, removeInboundsElement } = useFocusAwayHandler(onFocusAway);
	return (
		<Manager>
			<PopoverContext.Provider value={{ addInboundsElement, removeInboundsElement }}>
				{onFocusAway ? (
					<FocusCatcher ref={targetRef} display="inline-block" tabIndex="-1">
						{children}
					</FocusCatcher>
				) : (
					children
				)}
			</PopoverContext.Provider>
		</Manager>
	);
}

PopoverManager.propTypes = {
	children: PropTypes.node.isRequired,
	/** Per spec, this should always be used to support closing on click away. */
	onFocusAway: PropTypes.func,
};

const FocusCatcher = styled(Box).attrs({ tabIndex: '-1' })`
	&:focus {
		outline: none;
		box-shadow: none;
	}
`;

import React from 'react';
import PropTypes from 'prop-types';
import { Manager } from 'react-popper';
import { useFocusAwayHandler } from '../shared-hooks';
import { Box } from '../Box';
import { PopoverContext } from './popper-helpers';

export function PopoverManager({ children, onFocusAway, ...props }) {
	const { targetRef, addInboundsElement, removeInboundsElement } = useFocusAwayHandler(onFocusAway);
	return (
		<Manager>
			<PopoverContext.Provider value={{ addInboundsElement, removeInboundsElement }}>
				{onFocusAway ? (
					<Box
						css={`
							&:focus {
								outline: none;
								box-shadow: none;
							}
						`}
						ref={targetRef}
						display="inline-block"
						tabIndex="-1"
						{...props}
					>
						{children}
					</Box>
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

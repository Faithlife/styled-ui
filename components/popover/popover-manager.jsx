import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Manager } from 'faithlife-react-popper';
import { Box } from '../Box';
import { PopoverContext } from './popper-helpers';

export function PopoverManager({ children, onFocusAway, ...props }) {
	const reference = useRef();
	return (
		<Manager>
			<PopoverContext.Provider value={{ reference, onFocusAway }}>
				<Box display="inline-block" {...props} ref={reference}>
					{children}
				</Box>
			</PopoverContext.Provider>
		</Manager>
	);
}

PopoverManager.propTypes = {
	children: PropTypes.node.isRequired,
	/** Per spec, this should always be used to support closing on click away. */
	onFocusAway: PropTypes.func,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from '../shared-hooks'; // Copied from react-ui. Import from there when made available.
import { Popover } from './component';
import { PopoverManager } from './popover-manager';
import { PopoverReference } from './popper-helpers';

/** Simple tooltip that uses popovers internally. Does not support custom positioning. */
export function Tooltip(props) {
	const { children, text, content, isOpen, ...otherProps } = props;
	const [tooltipIsOpen, setToolTipIsOpen] = useState(false);
	const [isOnMobile, setIsOnMobile] = useState(false);

	const handleMouseEnter = () => {
		handleMouseLeave.cancel();
		setToolTipIsOpen(true);
	};

	const handleMouseLeave = useDebouncedCallback(() => {
		setToolTipIsOpen(false);
	}, 200);

	useEffect(() => {
		setIsOnMobile(window.matchMedia('(hover: none)').matches);
		return () => {
			handleMouseLeave.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isOnMobile ? (
		children
	) : (
		<PopoverManager>
			<PopoverReference
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={() => setToolTipIsOpen(false)}
			>
				{children}
			</PopoverReference>
			<Popover {...otherProps} isOpen={tooltipIsOpen || isOpen}>
				{content || text}
			</Popover>
		</PopoverManager>
	);
}

Tooltip.propTypes = {
	...Popover.propTypes,

	/** Content for the tooltip */
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** Text for the tooltip (deprecated) */
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

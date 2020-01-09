import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from '../shared-hooks'; // Copied from react-ui. Import from there when made available.
import { Popover } from './component';
import { PopoverManager } from './popover-manager';
import { PopoverReference } from './popper-helpers';

/** Simple tooltip that uses popovers internally. Does not support custom positioning. */
export function Tooltip(props) {
	const { children, text, content, isOpen, toggleOnClick, ...otherProps } = props;
	const [tooltipIsOpen, setToolTipIsOpen] = useState(false);
	const [isOnMobile, setIsOnMobile] = useState(false);

	const handleMouseEnter = () => {
		handleMouseLeave.cancel();
		setToolTipIsOpen(true);
	};

	const handleMouseLeave = useDebouncedCallback(() => {
		setToolTipIsOpen(false);
	}, 200);

	const toggle = () => {
		handleMouseLeave.cancel();
		setToolTipIsOpen(x => !x);
	};

	useEffect(() => {
		setIsOnMobile(window.matchMedia('(hover: none)').matches);
		return () => {
			handleMouseLeave.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isOnMobile && !toggleOnClick ? (
		children
	) : (
		<PopoverManager>
			<PopoverReference
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={() => {
					isOnMobile ? toggle() : setToolTipIsOpen(false);
				}}
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

	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	/** Content for the tooltip */
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** Text for the tooltip (deprecated) */
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** true if the tooltip should be toggled on click.
	 * By default tooltips are disabled on touch devices to prevent them from opening when tapping links or buttons.
	 * Use this if you're attaching a tooltip to something like an info icon that is not otherwise interactive. */
	toggleOnClick: PropTypes.bool,
};

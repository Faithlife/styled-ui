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

	const handleTap = e => {
		if (!tooltipIsOpen) {
			e.stopPropagation();
		}
		setToolTipIsOpen(!tooltipIsOpen);
	};

	const handleOutsideTap = e => {
		e.currentTarget.focus();
		setToolTipIsOpen(false);
	};

	useEffect(() => {
		const isOnMobile = window.matchMedia('(hover: none)').matches;
		if (isOnMobile) {
			setIsOnMobile(true);
			window.addEventListener('click', handleOutsideTap);
		}

		return () => {
			handleMouseLeave.cancel();
			if (isOnMobile) {
				window.removeEventListener('click', handleOutsideTap);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PopoverManager>
			<PopoverReference
				onMouseEnter={isOnMobile ? null : handleMouseEnter}
				onMouseLeave={isOnMobile ? null : handleMouseLeave}
				onClick={isOnMobile ? handleTap : () => setToolTipIsOpen(false)}
			>
				{children}
			</PopoverReference>
			<Popover {...otherProps} isOpen={isOpen === undefined ? tooltipIsOpen : isOpen}>
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

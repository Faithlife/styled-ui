import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Popover } from './popover';
import { Box } from '../Box';

function useDelayedHoverState(delay) {
	const [isHovered, setIsHovered] = useState(false);
	const timeouts = useRef({ isHovered: false });

	const cancel = useCallback(() => {
		clearTimeout(timeouts.current.enterTimeout);
		clearTimeout(timeouts.current.leaveTimeout);
	}, []);

	const onMouseEnter = useCallback(() => {
		cancel();
		if (!isHovered) {
			timeouts.current.enterTimeout = setTimeout(() => setIsHovered(true), delay);
		}
	}, [cancel, delay, isHovered]);

	const onMouseLeave = useCallback(() => {
		cancel();
		if (isHovered) {
			timeouts.current.leaveTimeout = setTimeout(() => setIsHovered(false), 200);
		}
	}, [cancel, isHovered]);

	return [isHovered, setIsHovered, onMouseEnter, onMouseLeave, cancel];
}

/** Simple tooltip that uses popovers internally. */
export function Tooltip(props) {
	const { children, text, content, toggleOnClick, delay, ...otherProps } = props;
	const [isOpen, setIsOpen, onMouseEnter, onMouseLeave, cancel] = useDelayedHoverState(delay);
	const [isOnMobile, setIsOnMobile] = useState(false);
	const ref = useRef();

	const toggle = useCallback(() => {
		cancel();
		setIsOpen(x => !x);
	}, [cancel, setIsOpen]);

	useEffect(() => {
		setIsOnMobile(window.matchMedia('(hover: none)').matches);
		return cancel;
	}, [cancel]);

	const referenceProps = {
		onMouseEnter,
		onMouseLeave,
		onClick: () => (isOnMobile ? toggle() : setIsOpen(false)),
		ref,
	};

	return isOnMobile && !toggleOnClick ? (
		children
	) : (
		<>
			{children instanceof Function ? (
				children(referenceProps)
			) : (
				<Box display="inline-block" {...referenceProps}>
					{children}
				</Box>
			)}
			{isOpen && (
				<Popover
					{...otherProps}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					reference={ref.current}
				>
					{content || text}
				</Popover>
			)}
		</>
	);
}

Tooltip.propTypes = {
	...Popover.propTypes,

	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	/** Hover delay in milliseconds */
	delay: PropTypes.number,
	/** Content for the tooltip */
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** Text for the tooltip (deprecated) */
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** true if the tooltip should be toggled on click.
	 * By default tooltips are disabled on touch devices to prevent them from opening when tapping links or buttons.
	 * Use this if you're attaching a tooltip to something like an info icon that is not otherwise interactive. */
	toggleOnClick: PropTypes.bool,
};

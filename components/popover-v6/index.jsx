/* eslint eqeqeq: ["error", "always", {"null": "never"}] */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import { PopoverContainer, PopoverArrow } from './styled';

export function usePopover(reference, options) {
	const [popperElement, setPopper] = useState();
	const [arrowElement, setArrow] = useState();
	const { styles, attributes, ...rest } = usePopper(reference, popperElement, {
		...options,
		modifiers: [
			...(options?.modifiers ?? []),
			{ name: 'arrow', options: { element: arrowElement } },
		],
	});

	return {
		popperElement,
		popperProps: { ...attributes.popper, style: styles.popper, ref: setPopper },
		arrowProps: { ...attributes.arrow, style: styles.arrow, ref: setArrow },
		...rest,
	};
}

const arrowOffset = { name: 'offset', options: { offset: [0, 10] } };
export function Popover({
	reference,
	placement,
	modifiers,
	strategy,
	container,
	hideArrow,
	onFocusAway,
	children,
	...restProps
}) {
	const { popperElement, popperProps, arrowProps } = usePopover(reference, {
		placement,
		modifiers: hideArrow ? modifiers : [arrowOffset].concat(modifiers ?? []),
		strategy,
	});

	useEffect(() => {
		if (popperElement != null && onFocusAway instanceof Function) {
			const onClick = event => {
				if (!popperElement.contains(event.target)) {
					onFocusAway();
				}
			};

			document.addEventListener('click', onClick);
			return () => document.removeEventListener('click', onClick);
		}
	}, [onFocusAway, popperElement]);

	const popover = (
		<PopoverContainer {...restProps} {...popperProps}>
			{children}
			{!hideArrow && <PopoverArrow {...arrowProps} />}
		</PopoverContainer>
	);

	if (container != null) {
		return ReactDOM.createPortal(popover, container === 'body' ? document.body : container.current);
	}

	return popover;
}

Popover.propTypes = {
	/** the element or virtual element to anchor to */
	reference: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.shape({
			getBoundingClientRect: PropTypes.func.isRequired,
			contextElement: PropTypes.element,
		}),
	]),
	/** where on the target the popover anchors */
	placement: PropTypes.oneOf([
		'auto',
		'auto-start',
		'auto-end',
		'top',
		'top-start',
		'top-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'right',
		'right-start',
		'right-end',
		'left',
		'left-start',
		'left-end',
	]),
	/** modifiers allow custom behavior, see https://popper.js.org/docs/v2/modifiers */
	modifiers: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
		}),
	),
	/** whether popover should use absolute or fixed positioning */
	strategy: PropTypes.oneOf(['absolute', 'fixed']),
	/** where to inject the popover, defaults to inline */
	container: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	/** whether or not to show the arrow */
	hideArrow: PropTypes.bool,
	/** handler useful for closing popover when clicking away */
	onFocusAway: PropTypes.func,
};

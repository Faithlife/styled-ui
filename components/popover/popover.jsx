import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
	autoPlacement,
	autoUpdate,
	arrow,
	flip,
	hide,
	limitShift,
	offset as floatingOffset,
	shift,
	useFloating,
} from '@floating-ui/react-dom';
import { useFocusAwayHandler } from '../shared-hooks/use-focus-away-handler';
import { mergeRefs } from '../utils/merge-refs';
import { PopoverContainer, PopoverArrow } from './styled';
import { getLegacyModifiers, getLegacyOverflowOptions, legacyOffset } from './legacy-modifiers';

const hasOwn = (object, property) => Object.prototype.hasOwnProperty.call(object, property);

function getViewportBoundary({ elements }) {
	const documentElement = elements.floating.ownerDocument.documentElement;
	if (documentElement.clientWidth > 0 && documentElement.clientHeight > 0) {
		return {};
	}

	const view = documentElement.ownerDocument.defaultView;
	return {
		rootBoundary: {
			x: 0,
			y: 0,
			width: documentElement.clientWidth || view?.innerWidth || 0,
			height: documentElement.clientHeight || view?.innerHeight || 0,
		},
	};
}

export function usePopover(reference, options) {
	const [arrowElement, setArrow] = useState();
	if (options) {
		const legacyOption = ['createPopper', 'onFirstUpdate'].find(option => hasOwn(options, option));
		if (legacyOption) {
			throw new Error(
				`usePopover no longer supports the Popper "${legacyOption}" option; use Floating UI middleware instead.`,
			);
		}
	}

	const requestedPlacement = options?.placement ?? 'bottom';
	const strategy = options?.strategy ?? 'absolute';
	const offsetValue = options?.offset ?? 0;
	const isAutoPlacement = requestedPlacement.startsWith('auto');
	const alignment = requestedPlacement.endsWith('-start')
		? 'start'
		: requestedPlacement.endsWith('-end')
		? 'end'
		: undefined;
	const placement = isAutoPlacement ? 'bottom' : requestedPlacement;
	const middleware = options?.middleware;
	const modifiers = options?.modifiers;
	const legacyModifiers = useMemo(() => getLegacyModifiers(modifiers), [modifiers]);
	const legacyRef = useRef();
	legacyRef.current = legacyModifiers;
	const offsetRef = useRef();
	offsetRef.current = legacyModifiers.offset?.options.offset;
	if (
		middleware !== undefined &&
		middleware !== null &&
		(legacyModifiers.flip || legacyModifiers.preventOverflow)
	) {
		throw new Error(
			'Do not combine Popper flip/preventOverflow modifiers with Floating UI middleware; move collision handling into middleware.',
		);
	}
	if (isAutoPlacement && legacyModifiers.flip?.enabled === false) {
		throw new Error(
			'Auto placement requires flip; use a concrete placement or Floating UI middleware.',
		);
	}
	const positioningMiddleware = useMemo(() => {
		if (middleware !== undefined && middleware !== null) {
			return middleware;
		}
		const collision = [];
		if (isAutoPlacement) {
			collision.push(
				autoPlacement(
					state => ({
						...(alignment && { alignment }),
						...getViewportBoundary(state),
						...getLegacyOverflowOptions(legacyRef.current.flip?.options),
					}),
					[alignment, legacyModifiers.flip],
				),
			);
		} else if (legacyModifiers.flip?.enabled !== false) {
			collision.push(
				flip(
					state => ({
						...getViewportBoundary(state),
						...getLegacyOverflowOptions(legacyRef.current.flip?.options),
					}),
					[legacyModifiers.flip],
				),
			);
		}
		if (
			legacyModifiers.preventOverflow?.enabled !== false &&
			(!isAutoPlacement || legacyModifiers.preventOverflow)
		) {
			collision.push(
				shift(
					state => ({
						limiter: limitShift(),
						...getViewportBoundary(state),
						...getLegacyOverflowOptions(legacyRef.current.preventOverflow?.options),
					}),
					[legacyModifiers.preventOverflow],
				),
			);
		}
		return collision;
	}, [middleware, isAutoPlacement, alignment, legacyModifiers]);
	const floatingMiddleware = useMemo(
		() => [
			legacyModifiers.offset?.enabled === false
				? floatingOffset(0)
				: offsetRef.current === undefined
				? floatingOffset(offsetValue)
				: legacyOffset(offsetRef),
			...positioningMiddleware,
			arrow({ element: arrowElement }),
			// Keep the marker independent of caller-supplied hide middleware.
			{ ...hide(getViewportBoundary), name: 'styledUiReferenceHidden' },
		],
		[offsetValue, positioningMiddleware, arrowElement, legacyModifiers],
	);

	const {
		placement: resolvedPlacement,
		strategy: resolvedStrategy,
		middlewareData,
		isPositioned,
		update,
		floatingStyles,
		refs,
	} = useFloating({
		placement,
		strategy,
		middleware: floatingMiddleware,
		elements: { reference },
		whileElementsMounted: autoUpdate,
	});

	useEffect(() => {
		if (modifiers) {
			update();
		}
	}, [modifiers, update]);

	const referenceHidden = middlewareData.styledUiReferenceHidden?.referenceHidden;
	return {
		popperProps: {
			'data-popper-placement': resolvedPlacement,
			'data-popper-reference-hidden':
				referenceHidden === undefined ? undefined : String(referenceHidden),
			style: { ...floatingStyles, position: resolvedStrategy },
			ref: refs.setFloating,
		},
		arrowProps: {
			style: {
				...(middlewareData.arrow?.x !== undefined &&
					middlewareData.arrow.x !== null && { left: middlewareData.arrow.x }),
				...(middlewareData.arrow?.y !== undefined &&
					middlewareData.arrow.y !== null && { top: middlewareData.arrow.y }),
			},
			ref: setArrow,
		},
		placement: resolvedPlacement,
		middlewareData,
		isPositioned,
		update,
	};
}

export function Popover(props) {
	const {
		reference,
		placement,
		strategy,
		container,
		hideArrow,
		onFocusAway,
		children,
		offset,
		middleware,
		modifiers,
		...restProps
	} = props;
	const focusRef = useFocusAwayHandler(reference, onFocusAway);
	const { popperProps, arrowProps } = usePopover(reference, {
		placement,
		strategy,
		offset: offset ?? (hideArrow ? 0 : 10),
		middleware,
		modifiers,
	});

	const { ref, ...popperRest } = popperProps;
	const popover = (
		<PopoverContainer tabIndex="-1" ref={mergeRefs(ref, focusRef)} {...restProps} {...popperRest}>
			{children}
			{!hideArrow && <PopoverArrow {...arrowProps} />}
		</PopoverContainer>
	);

	if (container !== null && container !== undefined) {
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
	/** distance in CSS pixels from the reference element */
	offset: PropTypes.number,
	/** supported legacy offset, flip, and preventOverflow options; use middleware for custom modifiers */
	modifiers: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			enabled: PropTypes.bool,
			options: PropTypes.object,
		}),
	),
	/** Floating UI middleware that replaces the default collision handling */
	middleware: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			fn: PropTypes.func.isRequired,
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

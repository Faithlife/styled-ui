import { useRef, useEffect } from 'react';

const isNullOrUndefined = v => v === null || v === undefined;

function isWithinReference(reference, target) {
	const referenceElement = reference?.contextElement ?? reference;
	return (
		target === reference ||
		target === referenceElement ||
		(typeof referenceElement?.contains === 'function' && referenceElement.contains(target))
	);
}

export function useFocusAwayHandler(reference, onFocusAway) {
	const targetRef = useRef();
	const focusAwayRef = useRef();
	focusAwayRef.current = onFocusAway;

	useEffect(() => {
		if (isNullOrUndefined(focusAwayRef.current)) {
			return;
		}

		const previousFocus = document.activeElement;
		targetRef.current.focus({ preventScroll: true });

		const handleFocusIn = event => {
			if (isNullOrUndefined(targetRef.current)) {
				return;
			}

			const target = event.target ?? document.activeElement;
			if (
				target !== targetRef.current &&
				!targetRef.current.contains(target) &&
				!isWithinReference(reference, target)
			) {
				previousFocus?.focus();
				focusAwayRef.current();
			}
		};
		const handleFocusOut = event => {
			if (isNullOrUndefined(targetRef.current)) {
				return;
			}

			const target = event.relatedTarget ?? document.activeElement;
			if (
				target !== targetRef.current &&
				!targetRef.current.contains(target) &&
				!isWithinReference(reference, target)
			) {
				previousFocus?.focus({ preventScroll: true });
				focusAwayRef.current();
			}
		};

		document.addEventListener('focusin', handleFocusIn);
		document.addEventListener('focusout', handleFocusOut);
		return () => {
			document.removeEventListener('focusin', handleFocusIn);
			document.removeEventListener('focusout', handleFocusOut);
		};
	}, [reference]);

	return targetRef;
}

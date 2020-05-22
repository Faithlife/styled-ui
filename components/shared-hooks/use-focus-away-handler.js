import { useRef, useEffect } from 'react';

const isNullOrUndefined = v => v === null || v === undefined;
export function useFocusAwayHandler(onFocusAway) {
	const targetRef = useRef();
	const focusAwayRef = useRef();
	focusAwayRef.current = onFocusAway;

	useEffect(() => {
		const previousFocus = document.activeElement;
		targetRef.current.focus({ preventScroll: true });

		const handleFocusIn = event => {
			if (isNullOrUndefined(targetRef.current) || isNullOrUndefined(focusAwayRef.current)) {
				return;
			}

			const target = event.target ?? document.activeElement;
			if (target !== targetRef.current && !targetRef.current.contains(target)) {
				previousFocus?.focus();
				focusAwayRef.current();
			}
		};
		const handleFocusOut = event => {
			if (isNullOrUndefined(targetRef.current) || isNullOrUndefined(focusAwayRef.current)) {
				return;
			}

			const target = event.relatedTarget ?? document.activeElement;
			if (target !== targetRef.current && !targetRef.current.contains(target)) {
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
	}, []);

	return targetRef;
}

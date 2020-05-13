/* eslint eqeqeq: ["error", "always", {"null": "never"}] */
import { useRef, useEffect } from 'react';

export function useFocusAwayHandler(onFocusAway) {
	const targetRef = useRef();
	const focusAwayRef = useRef();
	focusAwayRef.current = onFocusAway;

	useEffect(() => {
		const handleFocusIn = event => {
			if (targetRef.current == null || focusAwayRef.current == null) {
				return;
			}

			const target = event.target ?? document.activeElement;
			if (target !== targetRef.current && !targetRef.current.contains(target)) {
				focusAwayRef.current();
			}
		};
		const handleFocusOut = event => {
			if (targetRef.current == null || focusAwayRef.current == null) {
				return;
			}

			const target = event.relatedTarget ?? document.activeElement;
			if (target !== targetRef.current && !targetRef.current.contains(target)) {
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

import { useRef, useMemo, useEffect } from 'react';

// Copied from https://git/Logos/react-ui/blob/master/packages/useDebouncedCallback/index.ts because react-ui isn't available in this repo yet.
export function useDebouncedCallback(callback, delay) {
	const storedCallback = useRef(callback);
	const storedDelay = useRef(delay);
	const storedArgs = useRef([]);
	const timer = useRef(undefined);

	const api = useMemo(() => {
		const handleElapsed = () => {
			clearTimeout(timer.current);
			if (storedCallback.current) {
				storedCallback.current(...storedArgs.current);
			}
		};

		const fn = (...args) => {
			storedArgs.current = args;
			clearTimeout(timer.current);
			timer.current = setTimeout(handleElapsed, storedDelay.current);
		};

		fn.cancel = () => {
			clearTimeout(timer.current);
			timer.current = undefined;
		};

		fn.flush = () => {
			if (timer.current !== undefined) {
				handleElapsed();
			}
		};

		return fn;
	}, []);

	useEffect(() => {
		// updated stored delay and callback
		if (delay !== storedDelay.current) {
			storedDelay.current = delay;
		}

		if (callback !== storedCallback.current) {
			storedCallback.current = callback;
		}
	}, [delay, callback]);

	useEffect(() => {
		// clear any pending timers on unmount
		return function cleanUp() {
			clearTimeout(timer.current);
			timer.current = undefined;
		};
	}, []);

	return api;
}

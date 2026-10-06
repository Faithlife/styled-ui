import React, { useEffect, useMemo, useRef } from 'react';
import Async from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import debounce from 'lodash.debounce';

function createDebouncedLoadOptions(loadOptions, debounceInterval) {
	let isActive = true;
	let pendingCallback;

	const invokeLoadOptions = (inputValue, callback) => {
		if (!isActive) {
			return;
		}

		let hasCalledBack = false;
		const handleOptions = options => {
			if (!isActive || hasCalledBack) {
				return;
			}

			hasCalledBack = true;
			if (pendingCallback === callback) {
				pendingCallback = undefined;
			}
			callback(options);
		};

		const result = loadOptions(inputValue, handleOptions);
		if (result && typeof result.then === 'function') {
			result.then(handleOptions, error => {
				if (isActive) {
					throw error;
				}
			});
		}
	};

	const debouncedInvokeLoadOptions = debounce(invokeLoadOptions, debounceInterval);
	const debouncedLoadOptions = (inputValue, callback) => {
		if (!isActive) {
			return;
		}

		pendingCallback = callback;
		if (debounceInterval) {
			debouncedInvokeLoadOptions(inputValue, callback);
		} else {
			invokeLoadOptions(inputValue, callback);
		}
	};

	debouncedLoadOptions.cancel = settlePending => {
		isActive = false;
		debouncedInvokeLoadOptions.cancel();
		const callback = pendingCallback;
		pendingCallback = undefined;
		if (settlePending && callback) {
			callback();
		}
	};

	return debouncedLoadOptions;
}

function makeDebouncedSelect(Component) {
	return React.forwardRef(({ debounceInterval, loadOptions, ...props }, ref) => {
		const debouncedLoadOptions = useMemo(
			() => (loadOptions ? createDebouncedLoadOptions(loadOptions, debounceInterval) : undefined),
			[debounceInterval, loadOptions],
		);
		const isMounted = useRef(false);

		useEffect(() => {
			isMounted.current = true;
			return () => {
				isMounted.current = false;
			};
		}, []);

		useEffect(
			() => () => {
				if (debouncedLoadOptions) {
					debouncedLoadOptions.cancel(isMounted.current);
				}
			},
			[debouncedLoadOptions],
		);

		return <Component {...props} loadOptions={debouncedLoadOptions} ref={ref} />;
	});
}

export const DebouncedSelectAsync = makeDebouncedSelect(Async);
export const DebouncedSelectAsyncCreatable = makeDebouncedSelect(AsyncCreatable);

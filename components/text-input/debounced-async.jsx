import React, { useEffect, useMemo, useRef } from 'react';
import Async from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import debounce from 'lodash.debounce';

function createDebouncedLoadOptions(optionsRef, debounceInterval) {
	let pendingRequest;
	let generation = 0;
	let hasInputChanged = false;

	const invokeLoadOptions = request => {
		if (pendingRequest !== request) {
			return;
		}

		let hasCalledBack = false;
		const handleOptions = options => {
			// Late default options are still needed when the user clears a newer query.
			if (
				request.generation !== generation ||
				hasCalledBack ||
				(pendingRequest !== request && !request.isDefault)
			) {
				return;
			}

			hasCalledBack = true;
			if (pendingRequest === request) {
				pendingRequest = undefined;
			}
			request.callback(options);
		};
		const handleError = error => {
			if (request.generation !== generation || pendingRequest !== request || hasCalledBack) {
				return;
			}

			try {
				if (optionsRef.current.onLoadError) {
					optionsRef.current.onLoadError(error, request.inputValue);
				} else {
					console.error(error);
				}
			} catch (reportingError) {
				console.error(error);
				console.error(reportingError);
			} finally {
				handleOptions();
			}
		};

		try {
			const result = optionsRef.current.loadOptions(request.inputValue, handleOptions);
			if (result && typeof result.then === 'function') {
				result.then(handleOptions, handleError);
			}
		} catch (error) {
			handleError(error);
		}
	};

	const debouncedInvokeLoadOptions = debounce(invokeLoadOptions, debounceInterval);
	const debouncedLoadOptions = (inputValue, callback) => {
		pendingRequest = {
			inputValue,
			callback,
			generation,
			isDefault: !hasInputChanged && optionsRef.current.defaultOptions === true,
		};
		if (debounceInterval) {
			debouncedInvokeLoadOptions(pendingRequest);
		} else {
			invokeLoadOptions(pendingRequest);
		}
	};

	debouncedLoadOptions.cancel = settlePending => {
		generation++;
		debouncedInvokeLoadOptions.cancel();
		const request = pendingRequest;
		pendingRequest = undefined;
		if (settlePending && request) {
			request.callback();
		}
	};
	debouncedLoadOptions.invalidate = () => {
		hasInputChanged = true;
		debouncedInvokeLoadOptions.cancel();
		pendingRequest = undefined;
	};

	return debouncedLoadOptions;
}

function makeDebouncedSelect(Component) {
	return React.forwardRef(
		({ debounceInterval, loadOptions, onLoadError, onInputChange, ...props }, ref) => {
			const optionsRef = useRef();
			optionsRef.current = { loadOptions, onLoadError, defaultOptions: props.defaultOptions };
			const hasLoadOptions = Boolean(loadOptions);
			const debouncedLoadOptions = useMemo(
				() =>
					hasLoadOptions ? createDebouncedLoadOptions(optionsRef, debounceInterval) : undefined,
				[debounceInterval, hasLoadOptions],
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

			return (
				<Component
					{...props}
					onInputChange={(inputValue, meta) => {
						if (debouncedLoadOptions) {
							debouncedLoadOptions.invalidate();
						}
						return onInputChange && onInputChange(inputValue, meta);
					}}
					loadOptions={debouncedLoadOptions}
					ref={ref}
				/>
			);
		},
	);
}

export const DebouncedSelectAsync = makeDebouncedSelect(Async);
export const DebouncedSelectAsyncCreatable = makeDebouncedSelect(AsyncCreatable);

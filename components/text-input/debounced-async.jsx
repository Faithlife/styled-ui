import React, { useCallback, useMemo } from 'react';
import Async from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import debounce from 'lodash.debounce';
import { useCopyRefs } from '../shared-hooks';

function makeDebouncedSelect(Component) {
	return React.forwardRef(({ debounceInterval, ...props }, ref) => {
		const monkeyPatchDebounceSupport = useCallback(
			reactSelect => {
				if (reactSelect && debounceInterval) {
					const doLoadOptions = reactSelect.loadOptions.bind(reactSelect);
					reactSelect.loadOptions = debounce(doLoadOptions, debounceInterval);
				}
			},
			[debounceInterval],
		);

		const innerRef = useCopyRefs(
			useMemo(() => [ref, monkeyPatchDebounceSupport], [monkeyPatchDebounceSupport, ref]),
		);

		return <Component {...props} ref={innerRef} />;
	});
}

export const DebouncedSelectAsync = makeDebouncedSelect(Async);
export const DebouncedSelectAsyncCreatable = makeDebouncedSelect(AsyncCreatable);

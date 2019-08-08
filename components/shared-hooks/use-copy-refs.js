import { useCallback } from 'react';

export function useCopyRefs(refs) {
	const copy = useCallback(
		ref => {
			if (refs) {
				for (const item of refs) {
					if (item) {
						if (typeof item === 'function') {
							item(ref);
						} else {
							item.current = ref;
						}
					}
				}
			}
		},
		[refs],
	);

	return copy;
}

import { useEffect, useState } from 'react';

// React SSR does not support hydrating Portals, so we set the Portal container in a useEffect
// that will only run in the browser. See: https://github.com/facebook/react/issues/13097
export const usePortalContainer = containerProp => {
	const [container, setContainer] = useState(null);
	useEffect(() => {
		if (containerProp) {
			if (typeof containerProp === 'string') {
				// must be an id or body
				setContainer(
					containerProp === 'body' ? document.body : document.getElementById(containerProp),
				);
			} else {
				// must be a ref
				setContainer(typeof containerProp === 'object' ? containerProp.current : containerProp());
			}
		}
	}, [containerProp]);
	return container;
};

import { useMemo } from 'react';

export function usefilteredChildProps(props, childPropTypes) {
	return useMemo(
		() => {
			const parentProps = {};
			const childProps = {};
			const childPropNames = Object.keys(childPropTypes);

			for (const [propName, prop] of Object.entries(props)) {
				if (childPropNames.includes(propName)) {
					childProps[propName] = prop;
				} else {
					parentProps[propName] = prop;
				}
			}

			return [parentProps, childProps];
		},
		[props, childPropTypes],
	);
}

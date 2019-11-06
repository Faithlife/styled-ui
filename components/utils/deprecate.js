import React from 'react';

const hits = new Set();

export const deprecateComponent = (Component, message) => {
	const name = Component.displayName || Component.name;

	function forwardRef(props, ref) {
		deprecate(message);
		return <Component {...props} forwardedRef={ref} />;
	}
	forwardRef.displayName = `deprecated(${name})`;

	return React.forwardRef(forwardRef);
};

export const deprecateProp = (prop, message) => {
	if (typeof prop !== 'undefined') {
		deprecate(message);
	}
};

export const deprecate = message => {
	if (!hits.has(message)) {
		hits.add(message);
		if (process.env.NODE_ENV !== 'production') {
			console.warn(message);
		}
	}
};

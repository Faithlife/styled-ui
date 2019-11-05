import React from 'react';

var hits = new Set();

export const deprecate = (Component, message) => {
	return function(props) {
		if (!hits.has(Component)) {
			hits.add(Component);
			if (process.env.NODE_ENV !== 'production') {
				console.warn(message);
			}
		}

		return <Component {...props} />;
	};
};

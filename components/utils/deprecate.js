import React from 'react';

var hits = {};

export const deprecate = (Component, message) => {
	return function(props) {
		if (hits[Component]) {
			return <Component {...props} />;
		}

		hits[Component] = true;

		if (process.env.NODE_ENV !== 'production') {
			console.warn(message);
		}

		return <Component {...props} />;
	};
};

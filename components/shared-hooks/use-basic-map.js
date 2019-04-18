import { useState, useCallback } from 'react';

export function useBasicMap(initialState) {
	const [map, setMap] = useState(initialState || {});

	return {
		map,
		clear: useCallback(() => setMap({}), []),
		add: useCallback((key, value) => setMap(prevState => ({ ...prevState, [key]: value })), []),
		remove: useCallback(key =>
			setMap(prevState => {
				const { [key]: removed, ...rest } = prevState;
				return rest;
			}),
		),
	};
}

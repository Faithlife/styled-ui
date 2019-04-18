// Borrowed from https://github.com/reach/reach-ui/blob/master/packages/auto-id/src/index.js
import { useState, useEffect } from 'react';

let id = 1;
function genId() {
	return id++;
}

export function useId() {
	const [currentId, setCurrentId] = useState(null);

	useEffect(() => {
		setCurrentId(genId());
	}, []);

	return currentId;
}

import { useLayoutEffect, useState } from 'react';

export function useElementSize() {
	const [size, setSize] = useState(null);
	const [el, setEl] = useState(null);

	useLayoutEffect(() => {
		let observer;
		if (el) {
			setSize(el.getBoundingClientRect());
			observer = new ResizeObserver(([{ contentRect }]) => setSize(contentRect));
			observer.observe(el);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [el]);

	return [size, setEl];
}

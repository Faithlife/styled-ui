export function applyVariations(component, variationMap, props) {
	let wrappedComponent = component;
	const filteredProps = { ...props };

	for (const variation of Object.keys(variationMap) || []) {
		if (props.hasOwnProperty(variation)) {
			wrappedComponent = variationMap[variation](wrappedComponent);
			delete filteredProps[variation];
		}
	}

	return { component: wrappedComponent, filteredProps };
}

export const debouncedResize = callback => {
	let frame;
	const listener = () => {
		if (frame) window.cancelAnimationFrame(frame);

		frame = window.requestAnimationFrame(callback);
	};

	window.addEventListener('resize', listener);

	return {
		cancel: () => window.removeEventListener('resize', listener),
	};
};

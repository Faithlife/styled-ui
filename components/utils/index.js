export { BootstrapContainer, wrapBootstrap } from './bootstrap-container.jsx';
export { mapFromInnerRef, mapToInnerRef } from './forwardref-wrapper.jsx';

const variationCache = {};

export function applyVariations(component, variationMap, props) {
	let wrappedComponent = component;
	const filteredProps = { ...props };

	const variations = [];

	for (const variation of Object.keys(variationMap) || []) {
		if (props.hasOwnProperty(variation)) {
			variations.push(variation);
			delete filteredProps[variation];
		}
	}

	const cacheKey = JSON.stringify(variations.sort());

	if (variationCache[cacheKey] != null) {
		return { component: variationCache[cacheKey], filteredProps };
	}

	for (const variation of variations) {
		wrappedComponent = variationMap[variation](wrappedComponent);
	}

	variationCache[cacheKey] = wrappedComponent;

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

export const addSeparator = (items = [], separator = '\u00a0\u00a0•\u00a0\u00a0') => {
	const result = [];
	for (const item of items) {
		if (item) {
			result.push(item, separator);
		}
	}

	result.pop();
	return result;
};

export const resetStyles = `
	margin: 0;

	&,
	*,
	*:before,
	*:after {
		box-sizing: border-box;
	}
`;

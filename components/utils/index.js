export { forwardClassRef } from './forwardref-wrapper';
export { TransitionStatuses, TransitionTimeouts } from './transition-group-utils';
export { filterProps } from './filter-props';
export { deprecate, deprecateComponent, deprecateProp } from './deprecate';
export { getConfigProps, getConfigChild } from './get-config-props';

/**
 * Chooses the correct variant from a main variant prop and a set of boolean shortcut props.
 *
 * @param {string|undefined} variant - The value of the component's `variant` prop.
 * @param {{ [propName: string]: boolean }} shortcutProps - An object of shortcut prop names and boolean values, the names corresponding to variant name options.
 * @returns {string|null} The name of the selected variant (or `null` if no variant has been selected).
 */
export function getVariation(variant, shortcutProps) {
	if (variant) {
		return variant;
	}
	const match = [...Object.entries(shortcutProps)].find(entry => entry[1]);

	return match ? match[0] : null;
}

const componentCache = new WeakMap();

export function applyVariations(component, variationMap, props) {
	let wrappedComponent = component;

	// cache variations per styled component
	if (!componentCache.has(component)) {
		componentCache.set(component, {});
	}
	const variationCache = componentCache.get(component);

	const filteredProps = { ...props };
	const variations = [];

	// create the variations array based on the order of the variation map
	// so there is a predictable order of style application
	for (const variation of Object.keys(variationMap) || []) {
		if (props.hasOwnProperty(variation)) {
			variations.push(variation);
			delete filteredProps[variation];
		}
	}

	// sort the variations for the cache key
	const cacheKey = JSON.stringify([...variations].sort());
	if (variationCache[cacheKey]) {
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
		if (frame) {
			window.cancelAnimationFrame(frame);
		}

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
	font-family: inherit;

	&,
	*,
	*:before,
	*:after {
		box-sizing: border-box;
	}

	&::placeholder {
		font-style: initial;
	}

	p {
		padding: 0;
	}
`;

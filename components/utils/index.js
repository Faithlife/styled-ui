export { BootstrapContainer, wrapBootstrap } from './bootstrap-container';
export { forwardClassRef } from './forwardref-wrapper';
export { ClickAwayHandler } from './click-away-handler';
export {
	TransitionStatuses,
	TransitionTimeouts,
	TransitionPropTypeKeys,
	pick,
	omit,
} from './transition-group-utils';

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

	&::placeholder {
		font-style: initial;
	}

	p {
		padding: 0;
	}
`;

export { forwardClassRef } from './forwardref-wrapper';
export {
	TransitionStatuses,
	TransitionTimeouts,
	TransitionPropTypeKeys,
	pick,
	omit,
} from './transition-group-utils';
export { FocusAwayHandler } from './focus-away-handler';
export { filterChildProps } from './filter-props';

export function getVariation(variant, obj) {
	if (variant) {
		return variant;
	}
	return [...Object.entries(obj)].find(entry => entry[1])[0];
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

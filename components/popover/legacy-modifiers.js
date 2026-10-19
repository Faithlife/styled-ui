import { offset } from '@floating-ui/react-dom';

const overflowOptions = ['padding', 'boundary', 'rootBoundary', 'altBoundary'];
const supportedOptions = {
	offset: ['offset'],
	flip: overflowOptions,
	preventOverflow: overflowOptions,
};
const sides = ['top', 'right', 'bottom', 'left'];
const hasOwn = (object, property) => Object.prototype.hasOwnProperty.call(object, property);

function unsupported(detail) {
	throw new Error(`Unsupported Popper ${detail}; use Floating UI middleware instead.`);
}

function isOffsetPair(value) {
	return (
		Array.isArray(value) &&
		value.length === 2 &&
		Number.isFinite(value[0]) &&
		Number.isFinite(value[1])
	);
}

function isElement(value) {
	return value?.nodeType === 1 && typeof value.getBoundingClientRect === 'function';
}

export function getLegacyModifiers(modifiers) {
	if (modifiers === undefined || modifiers === null) {
		return {};
	}
	if (!Array.isArray(modifiers)) {
		unsupported('"modifiers" value (expected an array)');
	}

	return modifiers.reduce((result, modifier) => {
		const name = modifier?.name;
		if (!hasOwn(supportedOptions, name)) {
			unsupported(`modifier "${name}"`);
		}
		const field = Object.keys(modifier).find(key => !['name', 'enabled', 'options'].includes(key));
		if (field) {
			unsupported(`modifier "${name}" field "${field}"`);
		}
		if (hasOwn(modifier, 'enabled') && typeof modifier.enabled !== 'boolean') {
			unsupported(`modifier "${name}" enabled value`);
		}
		const options = modifier.options ?? {};
		if (typeof options !== 'object' || Array.isArray(options)) {
			unsupported(`modifier "${name}" options`);
		}
		const option = Object.keys(options).find(key => !supportedOptions[name].includes(key));
		if (option) {
			unsupported(`modifier "${name}" option "${option}"`);
		}
		if (
			options.offset !== undefined &&
			typeof options.offset !== 'function' &&
			!isOffsetPair(options.offset)
		) {
			unsupported('modifier "offset" value (expected [skidding, distance] or a function)');
		}
		const { padding, boundary, rootBoundary, altBoundary } = options;
		if (
			padding !== undefined &&
			!Number.isFinite(padding) &&
			(!padding ||
				typeof padding !== 'object' ||
				Array.isArray(padding) ||
				Object.keys(padding).some(side => !sides.includes(side) || !Number.isFinite(padding[side])))
		) {
			unsupported(`modifier "${name}" padding`);
		}
		if (
			boundary !== undefined &&
			boundary !== 'clippingParents' &&
			!isElement(boundary) &&
			!(Array.isArray(boundary) && Array.from(boundary).every(isElement))
		) {
			unsupported(`modifier "${name}" boundary`);
		}
		if (rootBoundary !== undefined && !['viewport', 'document'].includes(rootBoundary)) {
			unsupported(`modifier "${name}" rootBoundary`);
		}
		if (altBoundary !== undefined && typeof altBoundary !== 'boolean') {
			unsupported(`modifier "${name}" altBoundary`);
		}
		result[name] = {
			...result[name],
			...modifier,
			options: { ...result[name]?.options, ...options },
		};
		if (name === 'offset' && hasOwn(options, 'offset') && options.offset === undefined) {
			result[name].options.offset = [0, 0];
		}
		return result;
	}, {});
}

export function getLegacyOverflowOptions(options = {}) {
	return Object.keys(options).reduce((result, key) => {
		if (options[key] !== undefined) {
			result[key] =
				key === 'boundary' && options[key] === 'clippingParents'
					? 'clippingAncestors'
					: options[key];
		}
		return result;
	}, {});
}

export function legacyOffset(valueRef) {
	return {
		name: 'offset',
		options: valueRef.current,
		async fn(state) {
			const value = valueRef.current;
			const pair =
				typeof value === 'function'
					? value({
							placement: state.placement,
							reference: state.rects.reference,
							popper: state.rects.floating,
					  })
					: value;
			if (!isOffsetPair(pair)) {
				unsupported('modifier "offset" result (expected [skidding, distance])');
			}
			const rtl = await state.platform.isRTL?.(state.elements.floating);
			const vertical = /^(top|bottom)/.test(state.placement);
			return offset({
				mainAxis: pair[1],
				// Popper skidding uses physical axes, unlike Floating UI's logical crossAxis.
				crossAxis: pair[0] * (vertical && rtl ? -1 : 1),
			}).fn(state);
		},
	};
}

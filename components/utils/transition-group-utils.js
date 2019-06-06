/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */
export function omit(obj, omitKeys) {
	const result = {};
	Object.keys(obj).forEach(key => {
		if (!omitKeys.includes(key)) {
			result[key] = obj[key];
		}
	});
	return result;
}

/**
 * Returns a filtered copy of an object with only the specified keys.
 */
export function pick(obj, keys) {
	const pickKeys = Array.isArray(keys) ? keys : [keys];
	let length = pickKeys.length;
	let key;
	const result = {};

	while (length > 0) {
		length -= 1;
		key = pickKeys[length];
		result[key] = obj[key];
	}
	return result;
}

// These are all setup to match what is in the bootstrap _variables.scss
// https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
export const TransitionTimeouts = Object.freeze({
	Fade: 150, // $transition-fade
	Collapse: 350, // $transition-collapse
	Modal: 300, // $modal-transition
	Carousel: 600, // $carousel-transition
});

// Duplicated Transition.propType keys to ensure that Reactstrap builds
// for distribution properly exclude these keys for nested child HTML attributes
// since `react-transition-group` removes propTypes in production builds.
export const TransitionPropTypeKeys = Object.freeze([
	'in',
	'mountOnEnter',
	'unmountOnExit',
	'appear',
	'enter',
	'exit',
	'timeout',
	'onEnter',
	'onEntering',
	'onEntered',
	'onExit',
	'onExiting',
	'onExited',
]);

export const TransitionStatuses = Object.freeze({
	ENTERING: 'entering',
	ENTERED: 'entered',
	EXITING: 'exiting',
	EXITED: 'exited',
});

// Forked from https://github.com/JedWatson/react-select/blob/7fa28e8f0c100b783fcfed770ee0d8de146cdb6f/src/utils.js

/* eslint-disable */

/**
 * @param {Function} func
 * @param {number} wait
 * @param {number | undefined} immediate
 */
export function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		const context = this,
			args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

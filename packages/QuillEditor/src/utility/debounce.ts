export function debounce(func, debounceTime) {
	let timeout: any = null;
	const debouncedMethod = (...args) => {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			timeout = null;
			func(...args);
		}, debounceTime);
	};
	debouncedMethod.cancel = () => {
		clearTimeout(timeout);
		timeout = null;
	};
	return debouncedMethod;
}

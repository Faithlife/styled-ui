export function throttle(func, throttleTime) {
	let prevCallAt = 0;
	let timeout: any = null;
	let theArgs: any = null;
	const throttledMethod = (...args) => {
		theArgs = args;
		if (!timeout) {
			const now = Date.now();
			const timeSincePrevCall = now - prevCallAt;
			if (timeSincePrevCall > throttleTime) {
				prevCallAt = now;
				func(...theArgs);
			} else {
				timeout = setTimeout(() => {
					timeout = null;
					prevCallAt = Date.now();
					func(...theArgs);
				}, throttleTime - timeSincePrevCall);
			}
		}
	};
	throttledMethod.cancel = () => {
		clearTimeout(timeout);
		timeout = null;
	};
	return throttledMethod;
}

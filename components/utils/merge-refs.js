export function mergeRefs(...refs) {
	return v => {
		for (const ref of refs) {
			if (ref instanceof Function) {
				ref(v);
			} else {
				ref.current = v;
			}
		}
	};
}

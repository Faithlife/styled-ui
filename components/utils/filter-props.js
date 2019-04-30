export function filterChildProps(props, childPropTypes) {
	const parentProps = {};
	const childProps = {};
	const childPropNames = Object.keys(childPropTypes);

	for (const [propName, prop] of Object.entries(props)) {
		if (childPropNames.includes(propName)) {
			childProps[propName] = prop;
		} else {
			parentProps[propName] = prop;
		}
	}

	return [parentProps, childProps];
}

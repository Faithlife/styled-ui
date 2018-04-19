export function applyVariations(component, variationMap, props) {
	let wrappedComponent = component;

	for (const variation of Object.keys(variationMap) || []) {
		if (props.hasOwnProperty(variation)) {
			wrappedComponent = variationMap[variation](wrappedComponent);
		}
	}

	return { component: wrappedComponent, props };
}

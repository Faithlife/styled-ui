export function applyVariations(component, variationMap, props) {
	let wrappedComponent = component;
	const filteredProps = { ...props };

	for (const variation of Object.keys(variationMap) || []) {
		if (props.hasOwnProperty(variation)) {
			wrappedComponent = variationMap[variation](wrappedComponent);
			delete filteredProps[variation];
		}
	}

	return { component: wrappedComponent, filteredProps };
}

export const localization = {
	validationError: 'Sorry, there was an error. Please try again.',
};

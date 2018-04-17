import classNames from 'classnames';

export function themeClassNames(baseTheme, overridingTheme, propertyNames) {
	return classNames(
		propertyNames.reduce(
			(accumulator, currentValue) =>
				accumulator.concat([baseTheme[currentValue], (overridingTheme || {})[currentValue]]),
			[],
		),
	);
}

export function applyVariations(component, variationMap, variations) {
	let wrappedComponent = component;

	for (const variation of variations) {
		const mappedVariation = variationMap[variation];
		if (!mappedVariation) {
			throw new Error(`Unknown variation: ${variation}`);
		}

		wrappedComponent = mappedVariation(wrappedComponent);
	}

	return wrappedComponent;
}

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

	for (const variation of variations || []) {
		const mappedVariation = typeof variation === 'symbol' && variationMap[Symbol.keyFor(variation)];
		if (!mappedVariation) {
			throw new Error(`Unknown variation: ${variation}`);
		}

		wrappedComponent = mappedVariation(wrappedComponent);
	}

	return wrappedComponent;
}

export function getVariations(variationMap) {
	return Object.keys(variationMap).reduce(
		(prev, curr) => ({ ...prev, [curr]: Symbol.for(curr) }),
		{},
	);
}

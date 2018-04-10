import classNames from 'classnames';

export function themeClassNames(baseTheme, overridenTheme, propertyNames) {
	return classNames(
		propertyNames.reduce(
			(accumulator, currentValue) =>
				accumulator.concat([baseTheme[currentValue], (overridenTheme || {})[currentValue]]),
			[],
		),
	);
}

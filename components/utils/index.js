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

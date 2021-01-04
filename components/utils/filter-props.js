/**
 * Filters a collection of props by a list of names (or a prop types object).
 *
 * @param {object} props - A props object.
 * @param {(string[] | object)} filterPropNames - An array of prop names to filter by (or a prop
 * types object with keys to filter by).
 * @returns {{ matchingProps: object, remainingProps: object }} An array of two props objects: the
 * first containing the props that match the filter and the second containing the rest.
 */
export function filterProps(props, filterPropNames) {
	const filterList = Array.isArray(filterPropNames)
		? filterPropNames
		: Object.keys(filterPropNames);

	const matchingProps = {};
	const remainingProps = {};

	for (const [propName, propValue] of Object.entries(props)) {
		if (filterList.includes(propName)) {
			matchingProps[propName] = propValue;
		} else {
			remainingProps[propName] = propValue;
		}
	}

	return { matchingProps, remainingProps };
}

import PropTypes from 'prop-types';

/**
 * Creates a prop-type-checking function that validates whether the prop value is an element of a
 * given component type.
 *
 * @param {React.ElementType} Component - The component type to check for.
 * @returns A PropTypes validation function to use in a component's `propTypes` object.
 */
export function elementOfType(Component) {
	// Not very intuitive, but this is the best way to check with PropTypes (see https://github.com/facebook/react/issues/2979)
	return PropTypes.shape({
		type: PropTypes.oneOf([Component]),
	});
}

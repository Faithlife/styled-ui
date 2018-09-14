import React from 'react';

/** Function to map innerRef to forwardedRef, which gets mapped back with mapToInnerRef.
 * Needed to get styled components to play nicely with libraries that use innerRef.
 * See: https://github.com/styled-components/styled-components/issues/1560
 */
export function mapFromInnerRef(InnerComponent) {
	return props => {
		const { innerRef: forwardedRef, ...restProps } = props; // eslint-disable-line react/prop-types
		return <InnerComponent forwardedRef={forwardedRef} {...restProps} />;
	};
}

/** Function to map forwardedRef back to innerRef, see mapFromInnerRef */
export function mapToInnerRef(InnerComponent) {
	return props => {
		const { forwardedRef: innerRef, ...restProps } = props; // eslint-disable-line react/prop-types
		return <InnerComponent innerRef={innerRef} {...restProps} />;
	};
}

export function forwardClassRef(Component) {
	function forwardRef(props, ref) {
		return <Component {...props} forwardedRef={ref} />;
	}

	// Give this component a more helpful display name in DevTools.
	forwardRef.displayName = Component.displayName || Component.name;

	return React.forwardRef(forwardRef);
}

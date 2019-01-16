import React from 'react';

export function forwardClassRef(Component) {
	function forwardRef(props, ref) {
		const { innerRef, ...restProps } = props;
		// Legacy support for innerRef. Remove in the next major release.
		if (props.innerRef) {
			console.warn(
				`Warning from ${Component.displayName ||
					Component.name}: innerRef is deprecated, please use ref instead.`,
			);
			return <Component {...restProps} forwardedRef={innerRef} />;
		}

		return <Component {...props} forwardedRef={ref} />;
	}

	// Give this component a more helpful display name in DevTools.
	forwardRef.displayName = Component.displayName || Component.name;

	return React.forwardRef(forwardRef);
}

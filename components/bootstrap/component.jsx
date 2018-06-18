import React from 'react';
import * as _Bootstrap from 'reactstrap';

function wrapBootstrap(Component) {
	return props => (
		<div className="fl-wrapper">
			<Component {...props} />
		</div>
	);
}

export default Object.keys(_Bootstrap).reduce(
	(prev, curr) => ({ ...prev, [curr]: wrapBootstrap(_Bootstrap[curr]) }),
	{},
);

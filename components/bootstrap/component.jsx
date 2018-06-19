import React from 'react';
import * as _Bootstrap from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const { Provider, Consumer } = React.createContext({});

function wrapBootstrap(Component, inline) {
	const styles = inline ? { display: 'inline-block' } : {};
	return props => (
		<Consumer>
			{value =>
				value.inCssResetScope ? (
					<Component {...props} />
				) : (
					<Provider value={{ inCssResetScope: true }}>
						<div className="fl-wrapper" style={styles}>
							<Component {...props} />
						</div>
					</Provider>
				)
			}
		</Consumer>
	);
}

const inlineComponents = ['Button'];

const bootstrapComponents = Object.keys(_Bootstrap).reduce(
	(prev, curr) => ({
		...prev,
		[curr]: wrapBootstrap(_Bootstrap[curr], inlineComponents.includes(curr)),
	}),
	{},
);

export default {
	...bootstrapComponents,
	Typeahead: wrapBootstrap(Typeahead),
};

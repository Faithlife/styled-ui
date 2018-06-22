import React from 'react';
import * as _Bootstrap from 'reactstrap';
import styled from 'styled-components';
import { Typeahead } from 'react-bootstrap-typeahead';

const { Provider, Consumer } = React.createContext({});

function wrapBootstrap(Component, inline) {
	const styles = inline ? { display: 'inline-block' } : {};
	return React.forwardRef((props, ref) => (
		<Consumer>
			{value =>
				value.inCssResetScope ? (
					<Component ref={ref} {...props} />
				) : (
					<Provider value={{ inCssResetScope: true }}>
						<div className="fl-wrapper" style={styles}>
							<Component ref={ref} {...props} />
						</div>
					</Provider>
				)
			}
		</Consumer>
	));
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
	Typeahead: styled(wrapBootstrap(Typeahead))`
		.rbt-highlight-text {
			padding: 0;
			font-weight: bold;
			background-color: inherit;
		}
	`,
};

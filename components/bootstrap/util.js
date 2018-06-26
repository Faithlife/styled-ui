import React from 'react';

const { Provider, Consumer } = React.createContext({});

export function wrapBootstrap(Component, inline) {
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

import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext({});

export function wrapBootstrap(Component, inline) {
	const styles = inline ? { display: 'inline-block' } : {};
	return props => (
		<BootstrapContainer styles={styles}>
			<Component {...props} />
		</BootstrapContainer>
	);
}

export const BootstrapContainer = ({ children, styles }) => (
	<Consumer>
		{value =>
			value.inCssResetScope ? (
				children
			) : (
				<Provider value={{ inCssResetScope: true }}>
					<BootstrapContainer styles={styles}>
						<div className="fl-b" style={styles}>
							{children}
						</div>
					</BootstrapContainer>
				</Provider>
			)
		}
	</Consumer>
);

BootstrapContainer.propTypes = {
	children: PropTypes.node.isRequired,
	styles: PropTypes.object,
};

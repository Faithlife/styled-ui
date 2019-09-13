import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext({});

export const BootstrapContainer = ({ children, styles }) => {
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(
				'Warning: You are using a deprecated Bootstrap element that will be removed in the next major release of Styled UI.',
			);
		}
	}, []);
	return (
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
};

BootstrapContainer.propTypes = {
	children: PropTypes.node.isRequired,
	styles: PropTypes.object,
};

export function wrapBootstrap(Component, inline) {
	const styles = inline ? { display: 'inline-block' } : {};
	return props => (
		<BootstrapContainer styles={styles}>
			<Component {...props} />
		</BootstrapContainer>
	);
}

import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext({});

export class BootstrapContainer extends React.Component {
	static propTypes = { children: PropTypes.node.isRequired, styles: PropTypes.object };

	componentDidMount() {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(
				'Warning: You are using a deprecated Bootstrap element. \n',
				'Styled-UI has replaced all Bootstrap elements: https://faithlife.github.io/styled-ui/#/ \n',
			);
		}
	}

	render() {
		const { children, styles } = this.props;
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
	}
}

export function wrapBootstrap(Component, inline) {
	const styles = inline ? { display: 'inline-block' } : {};
	return props => (
		<BootstrapContainer styles={styles}>
			<Component {...props} />
		</BootstrapContainer>
	);
}

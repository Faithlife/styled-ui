import React from 'react';
import * as _Bootstrap from 'reactstrap';

function wrapBootstrap(Component, inline) {
	const styles = inline ? { display: 'inline-block' } : {};
	return props => (
		<div className="fl-wrapper" style={styles}>
			<Component {...props} />
		</div>
	);
}

export default {
	..._Bootstrap,
	Alert: wrapBootstrap(_Bootstrap.Alert),
	Button: wrapBootstrap(_Bootstrap.Button, true),
	Modal: wrapBootstrap(_Bootstrap.Modal),
	Navbar: wrapBootstrap(_Bootstrap.Navbar),
};

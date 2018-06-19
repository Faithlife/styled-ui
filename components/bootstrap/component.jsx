import React from 'react';
import PropTypes from 'prop-types';
import * as _Bootstrap from 'reactstrap';

function wrapBootstrap(Component, inline) {
	const styles = inline ? { display: 'inline-block' } : {};
	return props => (
		<div className="fl-wrapper" style={styles}>
			<Component {...props} />
		</div>
	);
}

const StyledContainer = props => {
	const styles = props.inline ? { display: 'inline-block' } : {};
	return (
		<div className="fl-wrapper" style={styles}>
			{props.children}
		</div>
	);
};

StyledContainer.propTypes = {
	inline: PropTypes.bool,
	children: PropTypes.node,
};

export default {
	..._Bootstrap,
	StyledContainer,
};

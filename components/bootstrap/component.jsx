import React from 'react';
import * as _Bootstrap from 'reactstrap';
import styled from 'styled-components';

const ButtonStyled = styled(_Bootstrap.Button)`
	&& {
		color: #ddd;
	}
`;

function wrapBootstrap(Component) {
	return props => (
		<div className="fl-wrapper">
			<Component {...props} />
		</div>
	);
}

export default {
	..._Bootstrap,
	Button: wrapBootstrap(_Bootstrap.Button),
	ButtonStyled,
};

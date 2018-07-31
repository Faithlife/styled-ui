import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

/** Renders a blue box containing tips on how to use our products */
export function HelpBox({ children, showLightBulb }) {
	return (
		<Styled.BlueBox>
			{showLightBulb && <Styled.BulbIcon />}
			<Styled.BlueBoxContent>{children}</Styled.BlueBoxContent>
		</Styled.BlueBox>
	);
}

HelpBox.propTypes = {
	children: PropTypes.node.isRequired,
	showLightBulb: PropTypes.bool,
};

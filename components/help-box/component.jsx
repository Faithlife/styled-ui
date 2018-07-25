import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

/** Renders a blue box containing tips on how to use our products */
export function HelpBox({ text, showLightBulb }) {
	return (
		<Styled.BlueBox>
			{showLightBulb && <Styled.BulbIcon />}
			<Styled.BlueBoxContent>{text}</Styled.BlueBoxContent>
		</Styled.BlueBox>
	);
}

HelpBox.propTypes = {
	text: PropTypes.element.isRequired,
	showLightBulb: PropTypes.bool,
};

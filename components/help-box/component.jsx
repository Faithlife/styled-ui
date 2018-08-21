import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

/** Renders a blue box containing tips on how to use our products */
export function HelpBox({ children, showLightBulb, className }) {
	return (
		<Styled.BlueBox className={className}>
			{showLightBulb && <Styled.BulbIcon />}
			<Styled.BlueBoxContent>{children}</Styled.BlueBoxContent>
		</Styled.BlueBox>
	);
}

HelpBox.propTypes = {
	/** See the docs for how to override styles properly  */
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	showLightBulb: PropTypes.bool,
};

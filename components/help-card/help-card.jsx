import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../shared-styles';
import { HelpCardBox, HelpCardContent } from './help-card-styled.jsx';

export default function HelpCard(props) {
	const { content, helpIcon: HelpIcon } = props;
	const backgroundColor = props.theme.backgroundColor;
	const borderColor = props.theme.borderColor;

	return (
		<HelpCardBox backgroundColor={backgroundColor} borderColor={borderColor}>
			{<HelpIcon />}
			<HelpCardContent backgroundColor={backgroundColor}>{content}</HelpCardContent>
		</HelpCardBox>
	);
}

HelpCard.propTypes = {
	content: PropTypes.any,
	helpIcon: PropTypes.element,
	theme: PropTypes.shape({
		backgroundColor: PropTypes.string,
		borderColor: PropTypes.string,
	}),
};

HelpCard.defaultProps = {
	helpIcon: 'To do: light bulb',
	theme: {
		backgroundColor: colors.blueTint,
		borderColor: colors.blueDark,
	},
};

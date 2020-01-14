import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@faithlife/styled-ui';
import { Button } from '@faithlife/styled-ui/v6';

Footer.propTypes = {
	acceptButtonText: PropTypes.string.isRequired,
	declineButtonText: PropTypes.string.isRequired,
	onAcceptClick: PropTypes.func.isRequired,
	onDeclineClick: PropTypes.func.isRequired,
};
export function Footer(props) {
	const { acceptButtonText, declineButtonText, onDeclineClick, onAcceptClick, ...rest } = props;
	return (
		<Box
			display="grid"
			gridAutoFlow={['row', 'column']}
			gridTemplateColumns={['[single-column] auto', '[decline] max-content [accept] max-content']}
			gridTemplateRows={['[accept] max-content [decline] max-content', '[single-row] max-content']}
			gridGap={['43px', '8px']}
			marginBottom="2px"
			{...rest}
		>
			<Box gridRow={['decline', 'single-row']} gridColumn={['single-column', 'decline']}>
				<Button variant="link" size="medium" width="120px" height="40px" onClick={onDeclineClick}>
					{declineButtonText}
				</Button>
			</Box>
			<Box gridRow={['accept', 'single-row']} gridColumn={['single-column', 'accept']}>
				<Button variant="primary" size="medium" width="120px" height="40px" onClick={onAcceptClick}>
					{acceptButtonText}
				</Button>
			</Box>
		</Box>
	);
}

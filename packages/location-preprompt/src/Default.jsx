import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@faithlife/styled-ui';
import { CommandSentence } from '@faithlife/command-sentence-control';
import { LocationPreprompt } from './LocationPreprompt.jsx';
import { LocationPin } from './LocationPin.jsx';
import { Title } from './Title.jsx';
import { Text } from './Text.jsx';
import { CenterBox } from './CenterBox.jsx';
import { Footer } from './Footer.jsx';
import defaultResources from '../locales/en-US/resources.json';

Default.propTypes = {
	isSmallViewport: PropTypes.bool,
	onAcceptClick: PropTypes.func.isRequired,
	onDeclineClick: PropTypes.func.isRequired,
	resources: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		instructionTemplate: PropTypes.string,
		allow: PropTypes.string,
		allowMobile: PropTypes.string,
		decline: PropTypes.string,
		accept: PropTypes.string,
	}),
};
export function Default({ isSmallViewport, onAcceptClick, onDeclineClick, resources }) {
	const localization = { ...defaultResources, ...resources };
	return (
		<LocationPreprompt width={['100%', '534px']} height={['100%', '442px']}>
			<CenterBox height="100%" overflow="auto">
				<LocationPin marginTop="50px" marginBottom="14px" />
				<Title marginBottom="35px">{localization.title}</Title>
				<Box marginBottom="26px" width={['338px', '392px']} height={['60px', '48px']}>
					<Text>{localization.description}</Text>
				</Box>
				<Box marginBottom="54px" width={['190px', '278px']} height={['38px', '20px']}>
					<Text>
						<CommandSentence template={localization.instructionTemplate}>
							<CommandSentence.Field name="CONFIRM">
								<strong>{isSmallViewport ? localization.allowMobile : localization.allow}</strong>
							</CommandSentence.Field>
						</CommandSentence>
					</Text>
				</Box>
				<Footer
					acceptButtonText={localization.accept}
					declineButtonText={localization.decline}
					onAcceptClick={onAcceptClick}
					onDeclineClick={onDeclineClick}
				/>
			</CenterBox>
		</LocationPreprompt>
	);
}

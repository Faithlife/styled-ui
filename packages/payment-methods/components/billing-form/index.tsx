import React from 'react';
import { theme as styledUITheme } from '@faithlife/styled-ui';
import { ThemeProvider } from 'styled-components';
import { LocalizationProvider } from '../../Localization';
import defaultTheme from '../theme';
import BillingProfileForm from './billing-form';
import defaultResources from '../../locales/en-US/resources.json';

const BillingForm: React.FunctionComponent<any> = ({
	actAndHandleException,
	localizedResources,
	onCommitBillingProfile,
	setSystemMessage,
	getCardInfoFromSessionStorage,
	setCardInfoToSessionStorage,
	theme = {},
}) => {
	const resoruces = { ...defaultResources, ...localizedResources };

	return (
		<LocalizationProvider localizedResources={resoruces}>
			<ThemeProvider theme={() => ({ ...defaultTheme, ...styledUITheme, ...theme })}>
				<BillingProfileForm
					onCommitBillingProfile={onCommitBillingProfile}
					actAndHandleException={actAndHandleException}
					setSystemMessage={setSystemMessage}
					getCardInfoFromSessionStorage={getCardInfoFromSessionStorage}
					setCardInfoToSessionStorage={setCardInfoToSessionStorage}
				/>
			</ThemeProvider>
		</LocalizationProvider>
	);
};

export default BillingForm;

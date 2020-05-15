import React from 'react';
import { theme as styledUITheme } from '@faithlife/styled-ui';
import { ThemeProvider } from 'styled-components';
import { LocalizationProvider } from '../../Localization';
import BillingProfiles from '../billing-profiles/billing-profiles';
import defaultTheme from '../theme';
import IPaymentMethodsProps from '../../typings/IPaymentMethodsProps';
import defaultResources from '../../locales/en-US/resources.json';

const PaymentMethods: React.FunctionComponent<IPaymentMethodsProps> = ({
	onSelectedBillingProfileChange,
	actAndHandleException,
	setSystemMessage,
	selectedBillingProfileId,
	isCalledPreorder = false,
	localizedResources,
	getCardInfoFromSessionStorage,
	setCardInfoToSessionStorage,
	handleSelectedProfileInvalid,
	theme = {},
	...props
}) => {
	const resources = { ...defaultResources, ...localizedResources };

	return (
		<LocalizationProvider localizedResources={resources}>
			<ThemeProvider theme={() => ({ ...styledUITheme, ...defaultTheme, ...theme })}>
				<BillingProfiles
					setSystemMessage={setSystemMessage}
					actAndHandleException={actAndHandleException}
					onSelectedBillingProfileChange={onSelectedBillingProfileChange}
					selectedProfileId={selectedBillingProfileId}
					isCalledPreorder={isCalledPreorder}
					getCardInfoFromSessionStorage={getCardInfoFromSessionStorage}
					setCardInfoToSessionStorage={setCardInfoToSessionStorage}
					handleSelectedProfileInvalid={handleSelectedProfileInvalid}
					allowAddressOnly={false}
					{...props}
				></BillingProfiles>
			</ThemeProvider>
		</LocalizationProvider>
	);
};

export default PaymentMethods;

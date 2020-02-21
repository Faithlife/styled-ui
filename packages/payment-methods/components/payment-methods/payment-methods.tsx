import React from 'react';
import { theme as styledUITheme } from '@faithlife/styled-ui';
import { ThemeProvider } from 'styled-components';
import { LocalizationProvider } from '../../Localization';
import BillingProfiles from '../billing-profiles/billing-profiles';
import theme from '../theme';
import IPaymentMethodsProps from '../../typings/IPaymentMethodsProps';

const PaymentMethods: React.FunctionComponent<IPaymentMethodsProps> = ({
	onSelectedBillingProfileChange,
	actAndHandleException,
	setSystemMessage,
	selectedBillingProfileId,
	isCalledPreorder = false,
	localizedResources,
}) => {
	return (
		<LocalizationProvider localizedResources={localizedResources}>
			<ThemeProvider theme={() => ({ ...theme, ...styledUITheme })}>
				<BillingProfiles
					setSystemMessage={setSystemMessage}
					actAndHandleException={actAndHandleException}
					onSelectedBillingProfileChange={onSelectedBillingProfileChange}
					selectedProfileId={selectedBillingProfileId}
					isCalledPreorder={isCalledPreorder}
				></BillingProfiles>
			</ThemeProvider>
		</LocalizationProvider>
	);
};

export default PaymentMethods;

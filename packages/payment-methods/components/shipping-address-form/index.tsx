import React from 'react';
import { theme as styledUITheme } from '@faithlife/styled-ui';
import { ThemeProvider } from 'styled-components';
import { LocalizationProvider } from '../../Localization';
import defaultTheme from '../theme';
import IShippingProps from '../../typings/IShippingProps';
import { ShippingAddressForm } from './shipping-address-form';
import defaultResources from '../../locales/en-US/resources.json';

const ShippingForm: React.FunctionComponent<IShippingProps> = ({
	setSystemMessage,
	localizedResources,
	actAndHandleException,
	onCommitClicked,
	billingProfile,
	theme = {},
}) => {
	const resources = { ...defaultResources, ...localizedResources };

	return (
		<LocalizationProvider localizedResources={resources}>
			<ThemeProvider theme={() => ({ ...styledUITheme, ...defaultTheme, ...theme })}>
				<ShippingAddressForm
					setSystemMessage={setSystemMessage}
					actAndHandleException={actAndHandleException}
					onCommitClicked={onCommitClicked}
					billingProfile={billingProfile}
				></ShippingAddressForm>
			</ThemeProvider>
		</LocalizationProvider>
	);
};

export default ShippingForm;

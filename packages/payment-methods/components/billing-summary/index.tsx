import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme as styledUITheme } from '@faithlife/styled-ui';
import theme from '../theme';
import BillingSummary from './billing-summary';
import { LocalizationProvider } from '../../Localization';
import ILocalizedResources from '../../typings/ILocalizedResources';
import defaultResources from '../../locales/en-US/resources.json';
import { IBillingProfileDto } from '../../clients/typings/orders';

interface IBillingSummaryProps {
	localizedResources: ILocalizedResources;
	billingProfile: IBillingProfileDto;
}

const BillingSummaryWrapper: React.FunctionComponent<IBillingSummaryProps> = ({
	localizedResources,
	billingProfile,
}) => {
	const resources = { ...defaultResources, ...localizedResources };
	return (
		<LocalizationProvider localizedResources={resources}>
			<ThemeProvider theme={() => ({ ...theme, ...styledUITheme })}>
				<BillingSummary billingProfile={billingProfile}></BillingSummary>
			</ThemeProvider>
		</LocalizationProvider>
	);
};

export default BillingSummaryWrapper;

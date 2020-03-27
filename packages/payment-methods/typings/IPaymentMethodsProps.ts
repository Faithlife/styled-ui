import IBillingProfileInfo from './IBillingProfileInfo';
import { ISystemMessage } from './ISystemMessage';
import ILocalizedResources from './ILocalizedResources';

export default interface IPaymentMethodsProps {
	onSelectedBillingProfileChange: (billingProfile: IBillingProfileInfo, action: any) => void;
	actAndHandleException: <T>(
		action: () => Promise<T>,
		actionDescription: string
	) => Promise<T | undefined>;
	setSystemMessage: (systemMessage: ISystemMessage) => void;
	selectedBillingProfileId?: string;
	isCalledPreorder?: boolean;
	localizedResources: ILocalizedResources;
	getCardInfoFromSessionStorage?: Function;
	setCardInfoToSessionStorage?: Function;
	handleSelectedProfileInvalid?: Function;
	theme?: any;
}
